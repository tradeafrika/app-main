import { supabaseClientMain } from "../../../supabase";
import { IUploadImageToStorage, uploadImageToStorage } from "../image/upload-service";

/**
 * Used by the seller to add products to the products table
 * @param product 
 * @returns 
 */
interface IProducts {
    name: string;
    description?: string;
    price: number;
    category?: string;
    country?: string;
    images: string[]; // Changed to support multiple images
    min_order_quantity?: number;
}

export async function addProduct(product: IProducts, storageArgs: IUploadImageToStorage) {
    const { data: { user }, error: userError } = await supabaseClientMain.auth.getUser();
    if (userError || !user) throw new Error("Not authenticated");
    
    let imageUrls: string[] = [];
    
    if (storageArgs.file) {
        const uploadResult = await uploadImageToStorage(storageArgs);
        if (!uploadResult.success) {
            return { success: false, error: uploadResult.error };
        }
        
        // Handle both single and multiple file results
        if (uploadResult.urls) {
            // Multiple files
            imageUrls = uploadResult.urls;
        } else if (uploadResult.url) {
            // Single file
            imageUrls = [uploadResult.url];
        }
    }
    
    const { data, error } = await supabaseClientMain.from("products").insert({
        ...product,
        images: imageUrls, // Store array of image URLs
        seller_id: user.id,
    }).select().single();
    
    if (error) throw new Error(error.message);
    return { success: true, data };
}