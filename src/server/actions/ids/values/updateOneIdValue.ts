import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneIdValueInput } from "~/utils/validation/ids/values/updateOneIdValue";
import { readOneIdValue } from "./readOneIdValue";
import { readOneId } from "../readOneId";

export const updateOneIdValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneIdValueInput;
}) => {
  await readOneIdValue({ tx, payload: { id: payload.id } });
  await readOneId({ tx, payload: { id: payload.parentId } });

  return tx.goodsIdValue.update({
    where: {
      id: payload.id,
    },
    data: {
      value: payload.value,
      goodsIdId: payload.parentId,
    },
  });
};
