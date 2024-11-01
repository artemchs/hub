import { type PrismaTransaction } from "~/server/db";
import { type CreateOneMediaInput } from "~/utils/validation/media/createOneMedia";

export const createOneMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneMediaInput;
}) => {
  return tx.goodsMedia.create({
    data: {
      key: payload.key,
    },
  });
};
