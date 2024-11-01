import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneGoodInput } from "~/utils/validation/goods/deleteOneGood";
import { readOneGood } from "./readOneGood";

export const deleteOneGood = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneGoodInput;
}) => {
  await readOneGood({ tx, payload });

  return tx.good.delete({
    where: {
      id: payload.id,
    },
  });
};
