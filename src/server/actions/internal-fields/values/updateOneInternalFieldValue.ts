import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/updateOneInternalFieldValue";
import { readOneInternalField } from "../readOneInternalField";
import { readOneInternalFieldValue } from "./readOneInternalFieldValue";

interface UpdateOneInternalFieldValueParams {
  tx: PrismaTransaction;
  payload: UpdateOneInternalFieldValueInput;
}

export const updateOneInternalFieldValue = async ({
  tx,
  payload,
}: UpdateOneInternalFieldValueParams) => {
  await readOneInternalField({ tx, payload: { id: payload.parentId } });
  await readOneInternalFieldValue({ tx, payload: { id: payload.id } });

  await tx.goodsInternalFieldValue.update({
    where: { id: payload.id },
    data: {
      value: payload.value,
      fieldId: payload.parentId,
    },
  });
};
