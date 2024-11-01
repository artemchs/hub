import { env } from "~/env";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { type Storage } from "~/server/storage";

export const deleteObject = async (
  client: Storage,
  params: { Key: string }
) => {
  try {
    const command = new DeleteObjectCommand({
      ...params,
      Bucket: env.S3_BUCKET,
    });

    await client.send(command);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete object from S3");
  }
};
