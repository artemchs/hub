import { type PrismaTransaction } from "~/server/db";
import { type ReadOneAttributeInput } from "~/utils/validation/attributes/readOneAttribute";

export const readOneAttribute = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneAttributeInput;
}) => {
  const attribute = await tx.goodsAttribute.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!attribute) {
    throw new Error("Attribute not found");
  }

  return attribute;
};
