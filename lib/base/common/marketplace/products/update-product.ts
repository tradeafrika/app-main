/**
 * Used by the seller to Update products of the page.
 */
import { supabaseClientMain } from "../../../supabase";
import { deleteImageFromStorage } from "../image/delete-service";
import { extractPathFromUrl } from "../image/get-image-path";
import { IUploadImageToStorage, uploadImageToStorage } from "../image/upload-service";

interface IUpdateProduct {
    productID: string;
    details: {
        name?: string;
        description?: string;
        price?: number;
        category?: string;
        country?: string;
        images?: string[]; 
        in_stock?: boolean;
        min_order_quantity?: number;
    }
}

export async function updateProduct(
    productId: string, 
    updates: IUpdateProduct, 
    storageArgs: IUploadImageToStorage
) {
    const { data: { user }, error: userError } = await supabaseClientMain.auth.getUser();
    if (userError || !user) throw new Error("Not authenticated");

    // Get the current images array
    const currentProductData = await supabaseClientMain
        .from("products")
        .select("images")
        .eq("id", productId)
        .single();

    if (currentProductData.error) {
        throw new Error(`Failed to fetch current product: ${currentProductData.error.message}`);
    }

    let currentImageUrls: string[] = currentProductData.data?.images || [];
    let newImageUrls: string[] = [];

    // Upload new images if provided
    if (storageArgs.file) {
        const uploadResult = await uploadImageToStorage(storageArgs);
        if (!uploadResult.success) {
            return { success: false, error: uploadResult.error };
        }

        // Handle both single and multiple file results
        if (uploadResult.urls) {
            // Multiple files
            newImageUrls = uploadResult.urls;
        } else if (uploadResult.url) {
            // Single file
            newImageUrls = [uploadResult.url];
        }
    }

    // Update the product
    const { data, error } = await supabaseClientMain
        .from("products")
        .update({
            images: newImageUrls.length > 0 ? newImageUrls : currentImageUrls, // Use new images if uploaded, otherwise keep current
            ...updates.details
        })
        .eq("id", productId)
        .eq("seller_id", user.id)
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to update product: ${error.message}`);
    }

    // Delete old images only if new images were uploaded successfully
    if (newImageUrls.length > 0 && currentImageUrls.length > 0) {
        // Delete old images in background (don't await to avoid blocking the response)
        deleteOldImages(currentImageUrls, storageArgs.bucketName);
    }

    return { success: true, data };
}

// Helper function to delete old images
async function deleteOldImages(imageUrls: string[], bucketName: string) {
    try {
        const deletePromises = imageUrls.map(async (imageUrl) => {
            if (imageUrl) {
                const imagePath = extractPathFromUrl(imageUrl, bucketName);
                return deleteImageFromStorage({ 
                    bucketName, 
                    imagePath 
                });
            }
        });

        await Promise.allSettled(deletePromises);
    } catch (error) {
        console.error('Error deleting old images:', error);
        // Don't throw here - we don't want to fail the update if image deletion fails
    }
}

// Alternative function for partial image updates (add/remove specific images)
export async function updateProductImages(
    productId: string,
    options: {
        addImages?: IUploadImageToStorage; // New images to add
        removeImageUrls?: string[]; // Specific image URLs to remove
        replaceAll?: boolean; // If true, replace all images with new ones
    }
) {
    const { data: { user }, error: userError } = await supabaseClientMain.auth.getUser();
    if (userError || !user) throw new Error("Not authenticated");

    // Get current images
    const currentProductData = await supabaseClientMain
        .from("products")
        .select("images")
        .eq("id", productId)
        .single();

    if (currentProductData.error) {
        throw new Error(`Failed to fetch current product: ${currentProductData.error.message}`);
    }

    let currentImageUrls: string[] = currentProductData.data?.images || [];
    let finalImageUrls: string[] = [...currentImageUrls];

    // Upload new images if provided
    let newImageUrls: string[] = [];
    if (options.addImages?.file) {
        const uploadResult = await uploadImageToStorage(options.addImages);
        if (!uploadResult.success) {
            return { success: false, error: uploadResult.error };
        }

        if (uploadResult.urls) {
            newImageUrls = uploadResult.urls;
        } else if (uploadResult.url) {
            newImageUrls = [uploadResult.url];
        }
    }

    if (options.replaceAll) {
        // Replace all images
        finalImageUrls = newImageUrls;
    } else {
        // Add new images
        finalImageUrls = [...finalImageUrls, ...newImageUrls];
        
        // Remove specific images
        if (options.removeImageUrls && options.removeImageUrls.length > 0) {
            finalImageUrls = finalImageUrls.filter(url => 
                !options.removeImageUrls!.includes(url)
            );
        }
    }

    // Update the product
    const { data, error } = await supabaseClientMain
        .from("products")
        .update({ images: finalImageUrls })
        .eq("id", productId)
        .eq("seller_id", user.id)
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to update product images: ${error.message}`);
    }

    // Delete removed images
    const imagesToDelete: string[] = [];
    
    if (options.replaceAll && currentImageUrls.length > 0) {
        imagesToDelete.push(...currentImageUrls);
    } else if (options.removeImageUrls && options.removeImageUrls.length > 0) {
        imagesToDelete.push(...options.removeImageUrls);
    }

    if (imagesToDelete.length > 0 && options.addImages?.bucketName) {
        deleteOldImages(imagesToDelete, options.addImages.bucketName);
    }

    return { success: true, data };
}