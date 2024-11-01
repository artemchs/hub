import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneMediaInput } from "~/utils/validation/media/updateOneMedia";
import { readOneMedia } from "./readOneMedia";

export const updateOneMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneMediaInput;
}) => {
  await readOneMedia({ tx, payload: { id: payload.id } });

  return tx.goodsMedia.update({
    where: {
      id: payload.id,
    },
    data: {
      key: payload.key,
    },
  });
};
