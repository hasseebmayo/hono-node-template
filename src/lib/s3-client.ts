import { DeleteObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import env from "@/env";

// Initialize the S3 client
const s3Client = new S3Client({
  region: env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
});

/**
 * Deletes objects from an S3 bucket.
 *
 * @param {string | string[]} keys - A single key or an array of keys to delete from the S3 bucket.
 * @returns {Promise<void>} - A promise that resolves when the objects are deleted from the bucket.
 */
export const deleteObjectsFromBucket = async (keys: string | string[]): Promise<void> => {
  // Ensure keys is always an array
  const keysArray = Array.isArray(keys) ? keys : [keys];

  const params = {
    Bucket: env.AWS_BUCKET_NAME,
    Delete: {
      Objects: keysArray.map((key) => ({ Key: key })),
      Quiet: false, // When set to true, S3 will not return any response for successfully deleted objects.
    },
  };

  // Send the delete request to S3
  await s3Client.send(new DeleteObjectsCommand(params));
};

/**
 * Uploads a file to an S3 bucket under a specified directory.
 *
 * The file name will be sanitized to remove special characters, spaces, and slashes, and a timestamp
 * will be appended to ensure uniqueness. The file will be uploaded to either the specified directory
 * or the root of the bucket.
 *
 * @param {File} file - The file to upload to S3.
 * @param {"banner-images" | "event-uploaded"} directory - The directory (prefix) where the file should be uploaded.
 *                                                             If not provided, the file is uploaded to the root of the bucket.
 * @returns {Promise<string>} - A promise that resolves to the key of the uploaded file.
 */
export const uploadFileToS3 = async (file: File, directory?: "banner-images" | "event-uploaded"): Promise<string> => {
    // Remove special characters, spaces, and slashes from the file name
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    // Create a unique key by appending a timestamp to the file name
    const key = `${sanitizedFileName}-${new Date().getTime()}.${file.type.split("/")[1]}`;

    // Convert the file to a buffer for uploading
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Prepare the upload parameters
    const uploadParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: directory ? `${directory}/${key}` : key, // Add the directory prefix if provided
      Body: buffer,
    };

    // Upload the file to S3
    await s3Client.send(new PutObjectCommand(uploadParams));

    // Return the full URL of the uploaded file
    const fileKey = directory ? `${directory}/${key}` : key;
    return `${env.AWS_BUCKET_URL}${fileKey}`;
  };
