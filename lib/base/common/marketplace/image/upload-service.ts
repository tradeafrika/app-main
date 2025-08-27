/**
 * Used to upload image(s) to supabase storage bucket
 */
import { supabaseClientMain } from "@/lib/base/supabase";

export interface IUploadImageToStorage {
    /**
     * Binary data for the image storage marketplace - can be single file or array of files
     */
    file: File | File[];
    expectedFolder: 'products';
    bucketName: string;
}

interface UploadResult {
    success: boolean;
    url?: string;
    urls?: string[];
    error?: string;
    failedFiles?: string[];
}

export async function uploadImageToStorage(options: IUploadImageToStorage): Promise<UploadResult> {
    try {
        // Check if it's an array of files or single file
        const files = Array.isArray(options.file) ? options.file : [options.file];
        const isMultiple = Array.isArray(options.file);
        
        // Validate files array
        if (files.length === 0) {
            return { success: false, error: 'No files provided' };
        }

        // Validate maximum number of files (limit to 10 images for multiple uploads)
        if (files.length > 10) {
            return { success: false, error: 'Maximum 10 images allowed' };
        }

        const uploadPromises: Promise<{ success: boolean; url?: string; fileName: string; error?: string }>[] = [];

        // Create upload promises for all files
        for (const file of files) {
            const uploadPromise = uploadSingleFile(file, options);
            uploadPromises.push(uploadPromise);
        }

        // Wait for all uploads to complete
        const results = await Promise.allSettled(uploadPromises);

        const successUrls: string[] = [];
        const failedFiles: string[] = [];

        // Process results
        for (const result of results) {
            if (result.status === 'fulfilled') {
                const uploadResult = result.value;
                if (uploadResult.success && uploadResult.url) {
                    successUrls.push(uploadResult.url);
                } else {
                    failedFiles.push(uploadResult.fileName);
                }
            } else {
                failedFiles.push('Unknown file');
            }
        }

        // Handle results based on whether it's single or multiple files
        if (isMultiple) {
            // Multiple files - return array of URLs
            if (successUrls.length === 0) {
                return { 
                    success: false, 
                    error: `All uploads failed. Failed files: ${failedFiles.join(', ')}`,
                    failedFiles 
                };
            }

            if (failedFiles.length > 0) {
                // Partial success
                return {
                    success: true,
                    urls: successUrls,
                    error: `Some files failed to upload: ${failedFiles.join(', ')}`,
                    failedFiles
                };
            }

            // Complete success for multiple files
            return {
                success: true,
                urls: successUrls
            };
        } else {
            // Single file - return single URL for backward compatibility
            if (successUrls.length === 0) {
                return { 
                    success: false, 
                    error: failedFiles.length > 0 ? `Upload failed for: ${failedFiles[0]}` : 'Upload failed' 
                };
            }

            return {
                success: true,
                url: successUrls[0]
            };
        }

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Helper function to upload a single file
async function uploadSingleFile(
    file: File, 
    options: IUploadImageToStorage
): Promise<{ success: boolean; url?: string; fileName: string; error?: string }> {
    try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            return { 
                success: false, 
                error: `${file.name} is not an image file`,
                fileName: file.name 
            };
        }
        
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            return { 
                success: false, 
                error: `${file.name} exceeds 5MB size limit`,
                fileName: file.name 
            };
        }
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${options.expectedFolder}/${fileName}`;
        
        // Upload to storage
        const { data, error } = await supabaseClientMain.storage
            .from(options.bucketName)
            .upload(filePath, file);
        
        if (error) {
            return { 
                success: false, 
                error: `Failed to upload ${file.name}: ${error.message}`,
                fileName: file.name 
            };
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabaseClientMain.storage
            .from(options.bucketName)
            .getPublicUrl(filePath);
        
        return { 
            success: true, 
            url: publicUrl,
            fileName: file.name 
        };
    } catch (error: any) {
        return { 
            success: false, 
            error: `Error uploading ${file.name}: ${error.message}`,
            fileName: file.name 
        };
    }
}