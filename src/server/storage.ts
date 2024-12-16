import { env } from "../env.js";
import { S3Client } from "@aws-sdk/client-s3";

const createS3Client = () =>
    new S3Client({
        region: env.S3_REGION,
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
    });

const globalForS3 = globalThis as unknown as {
    s3: ReturnType<typeof createS3Client> | undefined;
};

export const storage = globalForS3.s3 ?? createS3Client();

export type Storage = typeof storage;

if (env.NODE_ENV !== "production") globalForS3.s3 = storage;
