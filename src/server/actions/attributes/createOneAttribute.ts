import { type PrismaTransaction } from "~/server/db";
import { type CreateOneAttributeInput } from "~/utils/validation/attributes/createOneAttribute";

export const createOneAttribute = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneAttributeInput;
}) => {
  return tx.goodsAttribute.create({
    data: {
      name: payload.name,
    },
  });
};
