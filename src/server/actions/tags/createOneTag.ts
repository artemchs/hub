import { type PrismaTransaction } from "~/server/db";
import { type CreateOneTagInput } from "~/utils/validation/tags/createOneTag";

export const createOneTag = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneTagInput;
}) => {
  return tx.goodsTag.create({
    data: {
      name: payload.name,
    },
  });
};
