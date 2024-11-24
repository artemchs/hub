import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneTagInput } from "~/utils/validation/tags/deleteOneTag";
import { readOneTag } from "./readOneTag";

export const deleteOneTag = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneTagInput;
}) => {
  await readOneTag({ tx, payload });

  return tx.goodsTag.delete({
    where: {
      id: payload.id,
    },
  });
};
