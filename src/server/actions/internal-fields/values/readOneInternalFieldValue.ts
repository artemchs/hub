import { type PrismaTransaction } from "~/server/db";
import { type ReadOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/readOneInternalFieldValue";

interface ReadOneInternalFieldValueParams {
  tx: PrismaTransaction;
  payload: ReadOneInternalFieldValueInput;
}

export const readOneInternalFieldValue = async ({
  tx,
  payload,
}: ReadOneInternalFieldValueParams) => {
  const internalFieldValue = await tx.goodsInternalFieldValue.findUnique({
    where: { id: payload.id },
  });

  if (!internalFieldValue) {
    throw new Error("Internal field value not found");
  }

  return internalFieldValue;
};
