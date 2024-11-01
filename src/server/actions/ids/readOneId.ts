import { type PrismaTransaction } from "~/server/db";
import { type ReadOneIdInput } from "~/utils/validation/ids/readOneId";

export const readOneId = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneIdInput;
}) => {
  const id = await tx.goodsId.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!id) {
    throw new Error("Goods Id not found");
  }

  return id;
};
