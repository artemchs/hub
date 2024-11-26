import { type PrismaTransaction } from "~/server/db";
import { type ReadOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/readOneInternalFieldValue";
import { readOneInternalFieldValue } from "./readOneInternalFieldValue";

interface DeleteOneInternalFieldValueParams {
  tx: PrismaTransaction;
  payload: ReadOneInternalFieldValueInput;
}

export const deleteOneInternalFieldValue = async ({
  tx,
  payload,
}: DeleteOneInternalFieldValueParams) => {
  await readOneInternalFieldValue({ tx, payload });

  await tx.goodsInternalFieldValue.delete({
    where: { id: payload.id },
  });
};
