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
        image?: string;
        in_stock?: boolean;
        min_order_quantity?: number;
    }
}

export async function updateProduct(productId: string, updates: IUpdateProduct, storageArgs: IUploadImageToStorage) {
    const { data: { user }, error: userError } = await supabaseClientMain.auth.getUser();
    if (userError || !user) throw new Error("Not authenticated");

    /**
     * get the current image url
     */
    const tm = await supabaseClientMain.from("products").select("image").eq("id", productId)
    let currentImagURL = tm.data![0].image

    /**
     * Get the new Image file.
     */
    const uploadResult = await uploadImageToStorage(storageArgs);
    if (!uploadResult.success) {
        return uploadResult;
    }

    const { data, error } = await supabaseClientMain
        .from("products")
        .update({

            image: uploadResult.url,
            ...updates
        })
        .eq("id", productId)
        .eq("seller_id", user.id)
        .select()
        .single();

    if (currentImagURL) {
        const oldImagePath = extractPathFromUrl(currentImagURL, storageArgs.bucketName)
        await deleteImageFromStorage({ bucketName: storageArgs.bucketName, imagePath: oldImagePath })
    }

    if (error) throw new Error(error.message);
    return data;
}
