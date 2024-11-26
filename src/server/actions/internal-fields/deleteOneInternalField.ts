import { type PrismaTransaction } from "~/server/db";
import { type ReadOneInternalFieldInput } from "~/utils/validation/internal-fields/readOneInternalField";
import { readOneInternalField } from "./readOneInternalField";

interface DeleteOneInternalFieldParams {
  tx: PrismaTransaction;
  payload: ReadOneInternalFieldInput;
}

export const deleteOneInternalField = async ({
  tx,
  payload,
}: DeleteOneInternalFieldParams) => {
  await readOneInternalField({ tx, payload: { id: payload.id } });

  return await tx.goodsInternalField.delete({
    where: { id: payload.id },
  });
};
