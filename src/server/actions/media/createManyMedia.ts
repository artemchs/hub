import { type PrismaTransaction } from "~/server/db";
import { type CreateManyMediaInput } from "~/utils/validation/media/createManyMedia";

export const createManyMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateManyMediaInput;
}) => {
  return tx.goodsMedia.createMany({
    data: payload.files.map(({ key, name }) => ({
      key,
      name,
    })),
  });
};
