import { type PrismaTransaction } from "~/server/db";
import { type ReadOneTagInput } from "~/utils/validation/tags/readOneTag";

export const readOneTag = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneTagInput;
}) => {
  const tag = await tx.goodsTag.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!tag) {
    throw new Error("Goods tag not found");
  }

  return tag;
};
