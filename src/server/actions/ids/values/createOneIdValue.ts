import { type PrismaTransaction } from "~/server/db";
import { type CreateOneIdValueInput } from "~/utils/validation/ids/values/createOneIdValue";
import { readOneId } from "../readOneId";

export const createOneIdValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneIdValueInput;
}) => {
  await readOneId({ tx, payload: { id: payload.parentId } });

  return tx.goodsIdValue.create({
    data: {
      value: payload.value,
      goodsIdId: payload.parentId,
    },
  });
};
