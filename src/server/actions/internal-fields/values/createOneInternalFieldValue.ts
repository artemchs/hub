import type { PrismaTransaction } from "~/server/db";
import type { CreateOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/createOneInternalFieldValue";
import { readOneInternalField } from "../readOneInternalField";

interface CreateOneInternalFieldValueParams {
  tx: PrismaTransaction;
  payload: CreateOneInternalFieldValueInput;
}

export const createOneInternalFieldValue = async ({
  tx,
  payload,
}: CreateOneInternalFieldValueParams) => {
  await readOneInternalField({ tx, payload: { id: payload.parentId } });

  return await tx.goodsInternalFieldValue.create({
    data: {
      value: payload.value,
      fieldId: payload.parentId,
    },
  });
};
