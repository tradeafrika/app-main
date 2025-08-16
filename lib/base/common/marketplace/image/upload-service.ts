
/**
 * Used to upload image to supabase storage bucket
 */

import { supabaseClientMain } from "@/lib/base/supabase";

export interface IUploadImageToStorage {
    /**
     * Binary data for the image storage marketplace;
     */
    file: File;
    expectedFolder: 'products',
    bucketName:string;
}

interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

export async function uploadImageToStorage(options: IUploadImageToStorage): Promise<UploadResult> {

    try {
        // Validate file type
        if (!options.file.type.startsWith('image/')) {
            return { success: false, error: 'File must be an image' };
        }

        // Validate file size (5MB limit)
        if (options.file.size > 5 * 1024 * 1024) {
            return { success: false, error: 'File size must be less than 5MB' };
        }

        // Generate unique filename
        const fileExt = options.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${options.expectedFolder}/${fileName}`;

        // Upload to storage
        const { data, error } = await supabaseClientMain.storage
            .from(options.bucketName)
            .upload(filePath, options.file);

        if (error) {
            return { success: false, error: error.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseClientMain.storage
            .from(options.bucketName)
            .getPublicUrl(filePath);

        return { success: true, url: publicUrl };
    } catch (error: any) {
        return { success: false, error: error.message };
    }

}