import { type PrismaTransaction } from "~/server/db";
import { type ReadOneInternalFieldInput } from "~/utils/validation/internal-fields/readOneInternalField";

interface ReadOneInternalFieldParams {
  tx: PrismaTransaction;
  payload: ReadOneInternalFieldInput;
}

export const readOneInternalField = async ({
  tx,
  payload,
}: ReadOneInternalFieldParams) => {
  const internalField = await tx.goodsInternalField.findUnique({
    where: { id: payload.id },
  });

  if (!internalField) {
    throw new Error("Internal field not found");
  }

  return internalField;
};
