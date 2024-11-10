import { type S3Client } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import { generateUploadUrl } from "~/server/utils/storage/generate-upload-url";
import { type GenerateOneUploadUrlInput } from "~/utils/validation/media/generateOneUploadUrl";

export const generateOneUploadUrl = async ({
  storage,
  payload,
}: {
  storage: S3Client;
  payload: GenerateOneUploadUrlInput;
}) => {
  const key = `${payload.dir}/${createId()}`;

  const url = await generateUploadUrl(storage, {
    Key: key,
  });

  return {
    url,
    key,
  };
};
