
/**
 * This is used to get the path for the image URL
 * @param url 
 * @param bucketName 
 * @returns 
 */

export function extractPathFromUrl(url: string, bucketName: string): string {
  const pattern = `/storage/v1/object/public/${bucketName}/`;
  const urlParts = url.split(pattern);
  return urlParts[1] || '';
}