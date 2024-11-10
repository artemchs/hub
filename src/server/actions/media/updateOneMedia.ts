import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneMediaInput } from "~/utils/validation/media/updateOneMedia";
import { readOneMedia } from "./readOneMedia";
import { deleteObject } from "~/server/utils/storage/delete-object";
import { type S3Client } from "@aws-sdk/client-s3";

export const updateOneMedia = async ({
  tx,
  storage,
  payload,
}: {
  tx: PrismaTransaction;
  storage: S3Client;
  payload: UpdateOneMediaInput;
}) => {
  const media = await readOneMedia({ tx, payload: { id: payload.id } });

  await deleteObject(storage, { Key: media.key });

  return tx.goodsMedia.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
      key: payload.key,
    },
  });
};
