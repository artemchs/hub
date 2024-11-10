import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneMediaInput } from "~/utils/validation/media/deleteOneMedia";
import { readOneMedia } from "./readOneMedia";
import { deleteObject } from "~/server/utils/storage/delete-object";
import { storage } from "~/server/storage";

export const deleteOneMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneMediaInput;
}) => {
  const data = await readOneMedia({ tx, payload: { id: payload.id } });

  await deleteObject(storage, {
    Key: data.key,
  });

  return tx.goodsMedia.delete({
    where: {
      id: payload.id,
    },
  });
};
