import { env } from "~/env";
import { type Storage } from "~/server/storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { type Readable } from "stream";

export const downloadObject = async (
  client: Storage,
  params: { Key: string }
) => {
  try {
    const command = new GetObjectCommand({
      ...params,
      Bucket: env.S3_BUCKET,
    });

    const response = await client.send(command);

    // Convert the response.Body stream to a buffer
    const streamToBuffer = (stream: Readable): Promise<Buffer> => {
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk: Buffer) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
      });
    };

    const buffer = await streamToBuffer(response.Body as Readable);

    return buffer;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to download object from S3");
  }
};
