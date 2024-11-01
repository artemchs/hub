import { type PrismaTransaction } from "~/server/db";
import { type ReadOneAttributeValueInput } from "~/utils/validation/attributes/values/readOneAttributeValue";

export const readOneAttributeValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneAttributeValueInput;
}) => {
  const attributeValue = await tx.goodsAttributeValue.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!attributeValue) {
    throw new Error("Goods attribute value not found");
  }

  return attributeValue;
};
