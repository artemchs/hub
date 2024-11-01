import { env } from "~/env";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { type Storage } from "~/server/storage";

export const deleteObjects = async (
  client: Storage,
  params: { Keys: string[] }
) => {
  try {
    const command = new DeleteObjectsCommand({
      Bucket: env.S3_BUCKET,
      Delete: {
        Objects: params.Keys.map((Key) => ({ Key })),
        Quiet: false,
      },
    });

    await client.send(command);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete objects from S3");
  }
};
