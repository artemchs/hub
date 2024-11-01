import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneMediaInput } from "~/utils/validation/media/deleteOneMedia";
import { readOneMedia } from "./readOneMedia";

export const deleteOneMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneMediaInput;
}) => {
  await readOneMedia({ tx, payload: { id: payload.id } });

  return tx.goodsMedia.delete({
    where: {
      id: payload.id,
    },
  });
};
