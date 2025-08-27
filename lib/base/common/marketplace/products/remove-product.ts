/**
 * Used by the supplier to remove products from the marketplace
 * @param productId
 * @returns
 */
import { supabaseClientMain } from "../../../supabase";
import { deleteImageFromStorage } from "../image/delete-service";
import { extractPathFromUrl } from "../image/get-image-path";

interface IRemoveProducts {
    productID: string;
}

interface IStorageConfig {
    bucketName: string;
}

export async function removeProduct(options: IRemoveProducts, storageArgs: IStorageConfig) {
    const { data: { user }, error: userError } = await supabaseClientMain.auth.getUser();
    if (userError || !user) throw new Error("Not authenticated");

    // Get current images array
    const productData = await supabaseClientMain
        .from("products")
        .select("images")
        .eq("id", options.productID)
        .eq("seller_id", user.id) // Ensure user owns the product
        .single();

    if (productData.error) {
        if (productData.error.code === 'PGRST116') {
            // No rows returned - product doesn't exist or user doesn't own it
            throw new Error("Product not found or you don't have permission to delete it");
        }
        throw new Error(`Failed to fetch product: ${productData.error.message}`);
    }

    const currentImageUrls: string[] = productData.data?.images || [];

    // Delete the product from database
    const { error } = await supabaseClientMain
        .from("products")
        .delete()
        .eq("id", options.productID)
        .eq("seller_id", user.id);

    if (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
    }

    // Delete all associated images from storage
    if (currentImageUrls.length > 0) {
        await deleteMultipleImages(currentImageUrls, storageArgs.bucketName);
    }

    return { success: true };
}

// Helper function to delete multiple images
async function deleteMultipleImages(imageUrls: string[], bucketName: string) {
    try {
        const deletePromises = imageUrls.map(async (imageUrl) => {
            if (imageUrl && imageUrl.trim() !== '') {
                try {
                    const imagePath = extractPathFromUrl(imageUrl, bucketName);
                    return await deleteImageFromStorage({ 
                        bucketName, 
                        imagePath 
                    });
                } catch (error) {
                    console.error(`Failed to delete image ${imageUrl}:`, error);
                    return { success: false, error: `Failed to delete ${imageUrl}` };
                }
            }
        });

        const results = await Promise.allSettled(deletePromises);
        
        // Log any failures but don't throw - we don't want to fail the product deletion
        // const failures = results.filter(result => 
        //     result.status === 'rejected' || 
        //     (result.status === 'fulfilled' && result.value && !result.value.success)
        // );

        // if (failures.length > 0) {
        //     console.warn(`Some images failed to delete: ${failures.length} out of ${imageUrls.length}`);
        // }

    } catch (error) {
        console.error('Error deleting images:', error);
        // Don't throw here - we don't want to fail the product deletion if image cleanup fails
    }
}

// Alternative function for batch product removal
export async function removeMultipleProducts(productIds: string[], storageArgs: IStorageConfig) {
    const { data: { user }, error: userError } = await supabaseClientMain.auth.getUser();
    if (userError || !user) throw new Error("Not authenticated");

    const results = {
        successful: [] as string[],
        failed: [] as { productId: string; error: string }[]
    };

    for (const productId of productIds) {
        try {
            await removeProduct({ productID: productId }, storageArgs);
            results.successful.push(productId);
        } catch (error) {
            results.failed.push({
                productId,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    return {
        success: results.failed.length === 0,
        results,
        message: `Successfully deleted ${results.successful.length} products. ${results.failed.length} failed.`
    };
}