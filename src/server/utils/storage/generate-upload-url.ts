import { type Storage } from "~/server/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const generateUploadUrl = async (
  client: Storage,
  params: { Key: string }
) => {
  try {
    const command = new PutObjectCommand({
      ...params,
      Bucket: process.env.S3_BUCKET,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate upload URL");
  }
};
