import { type S3Client } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import { generateUploadUrl } from "~/server/utils/storage/generate-upload-url";
import {
  GenerateManyUploadUrlsWithKeysInput,
  type GenerateManyUploadUrlsInput,
} from "~/utils/validation/media/generateManyUploadUrls";

export const generateManyUploadUrls = async ({
  storage,
  payload,
}: {
  storage: S3Client;
  payload: GenerateManyUploadUrlsInput;
}) => {
  const keys = Array.from({ length: payload.count }, () => {
    return `${payload.dir}/${createId()}`;
  });

  const urls = await Promise.all(
    keys.map((key) => generateUploadUrl(storage, { Key: key }))
  );

  return {
    urls,
    keys,
  };
};

export const generateManyUploadUrlsWithKeys = async ({
  storage,
  payload,
}: {
  storage: S3Client;
  payload: GenerateManyUploadUrlsWithKeysInput;
}) => {
  const result: { key: string; url: string; originalKey: string }[] = [];

  for (const key of payload.keys) {
    const url = await generateUploadUrl(storage, {
      Key: `${payload.dir}/${key}`,
    });
    result.push({ key: `${payload.dir}/${key}`, url, originalKey: key });
  }

  return result;
};
