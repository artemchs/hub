import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/deleteOneCharacteristicValue";
import { readOneCharacteristicValue } from "./readOneCharacteristicValue";

export const deleteOneCharacteristicValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneCharacteristicValueInput;
}) => {
  await readOneCharacteristicValue({ tx, payload: { id: payload.id } });

  return tx.goodsCharacteristicValue.delete({
    where: {
      id: payload.id,
    },
  });
};
