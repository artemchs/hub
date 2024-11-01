import { type PrismaTransaction } from "~/server/db";
import { type ReadOneGoodInput } from "~/utils/validation/goods/readOneGood";

export const readOneGood = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneGoodInput;
}) => {
  const good = await tx.good.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!good) {
    throw new Error(`Good not found`);
  }

  return good;
};
