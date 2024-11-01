import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneAttributeValueInput } from "~/utils/validation/attributes/values/deleteOneAttributeValue";
import { readOneAttributeValue } from "./readOneAttributeValue";

export const deleteOneAttributeValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneAttributeValueInput;
}) => {
  await readOneAttributeValue({ tx, payload: { id: payload.id } });

  return tx.goodsAttributeValue.delete({
    where: {
      id: payload.id,
    },
  });
};
