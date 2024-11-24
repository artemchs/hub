import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneTagInput } from "~/utils/validation/tags/udpateOneTag";
import { readOneTag } from "./readOneTag";

export const updateOneTag = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneTagInput;
}) => {
  await readOneTag({ tx, payload });

  return tx.goodsTag.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
    },
  });
};
