import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneAttributeInput } from "~/utils/validation/attributes/deleteOneAttribute";
import { readOneAttribute } from "./readOneAttribute";

export const deleteOneAttribute = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneAttributeInput;
}) => {
  await readOneAttribute({ tx, payload: { id: payload.id } });

  return tx.goodsAttribute.delete({
    where: {
      id: payload.id,
    },
  });
};
