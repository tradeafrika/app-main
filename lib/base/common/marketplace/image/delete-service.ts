
/**
 * Used to delete Images from the storage bucket
 */

import { supabaseClientMain } from "@/lib/base/supabase";

interface IDeleteImageStorage {
    bucketName: string;
    imagePath: string;
}

export async function deleteImageFromStorage(options: IDeleteImageStorage): Promise<boolean> {
    try {
        const { error } = await supabaseClientMain.storage
            .from(options.bucketName)
            .remove([options.imagePath]);

        return !error;
    } catch (error) {
        console.error('Error deleting image:', error);
        return false;
    }
}