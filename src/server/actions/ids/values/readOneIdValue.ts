import { type PrismaTransaction } from "~/server/db";
import { type ReadOneIdValueInput } from "~/utils/validation/ids/values/readOneIdValue";

export const readOneIdValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneIdValueInput;
}) => {
  const idValue = await tx.goodsIdValue.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!idValue) {
    throw new Error("Goods id value not found");
  }

  return idValue;
};
