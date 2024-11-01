import { env } from "~/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { type Storage } from "~/server/storage";

export const uploadObject = async (
  client: Storage,
  params: { Key: string; Body: Buffer }
) => {
  try {
    const command = new PutObjectCommand({
      ...params,
      Bucket: env.S3_BUCKET,
    });

    await client.send(command);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload object to S3");
  }
};
