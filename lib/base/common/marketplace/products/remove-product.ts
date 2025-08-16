
/**
 * Used by the supplier to remove products from the marketplace
 * @param productId 
 * @returns 
 */

import { supabaseClientMain } from "../../../supabase";
import { deleteImageFromStorage } from "../image/delete-service";
import { extractPathFromUrl } from "../image/get-image-path";
import { IUploadImageToStorage } from "../image/upload-service";

interface IRemoveProducts {
    productID: string;
}

export async function removeProduct(options: IRemoveProducts, storageArgs: IUploadImageToStorage) {
    const { data: { user }, error: userError } = await supabaseClientMain.auth.getUser();
    if (userError || !user) throw new Error("Not authenticated");

    const tm = await supabaseClientMain.from("products").select("image").eq("id", options.productID)
    let currentImagURL = tm.data![0].image


    // only delete if this product belongs to logged-in user
    const { error } = await supabaseClientMain
        .from("products")
        .delete()
        .eq("id", options.productID)
        .eq("seller_id", user.id);

    if (currentImagURL) {
        const oldImagePath = extractPathFromUrl(currentImagURL, storageArgs.bucketName)
        await deleteImageFromStorage({ bucketName: storageArgs.bucketName, imagePath: oldImagePath })
    }

    if (error) throw new Error(error.message);
    return { success: true };
}
