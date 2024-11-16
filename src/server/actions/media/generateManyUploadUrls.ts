import { type S3Client } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import { generateUploadUrl } from "~/server/utils/storage/generate-upload-url";
import { type GenerateManyUploadUrlsInput } from "~/utils/validation/media/generateManyUploadUrls";

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
