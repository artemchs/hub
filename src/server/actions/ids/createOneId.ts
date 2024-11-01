import { type PrismaTransaction } from "~/server/db";
import { type CreateOneIdInput } from "~/utils/validation/ids/createOneId";

export const createOneId = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneIdInput;
}) => {
  return tx.goodsId.create({
    data: {
      name: payload.name,
    },
  });
};
