/**
 * Generates a URL representing the provided file, with the filename Base64 encoded and appended to the URL.
 *
 * @param file - The File object from which the URL will be created.
 * @returns A string representing the URL of the file with the Base64 encoded filename appended.
 */
export function createUrlFromFile(file: File): string {
  const encodedFilename = btoa(file.name);
  return URL.createObjectURL(file) + `-@${encodedFilename}@-`;
}

/**
 * Fetches a file from the provided URL, extracting the filename from the URL and decoding it from Base64.
 *
 * @param url - The URL of the file, which includes a Base64 encoded filename in the format '-@encodedFilename@-'.
 * @returns A Promise that resolves to the File object fetched from the URL, or null if there is an error.
 */
export async function fetchFileFromUrl(url: string): Promise<File | null> {
  try {
    const filenamePattern = /-@([^@]+)@-/;
    const match = url.match(filenamePattern);
    const filename = match ? atob(match[1]) : url.split('/').pop() || 'default_filename';

    const response = await fetch(url.replace(filenamePattern, ''));

    if (!response.ok) {
      throw new Error(`Failed to fetch file from URL: ${url}`);
    }

    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
    const blob = await response.blob();
    const file = new File([blob], filename, {type: contentType});
    return file;
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
}

export async function customFormSubmit<T>(handleSubmit: any): Promise<T> {
  return await new Promise(async (response, reject) => {
    await handleSubmit(
      (data: T) => response(data),
      (e: any) => reject(e)
    )();
  });
}
