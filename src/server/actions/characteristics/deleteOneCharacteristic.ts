import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneCharacteristicInput } from "~/utils/validation/characteristics/deleteOneCharacteristic";
import { readOneCharacteristic } from "./readOneCharacteristic";

export const deleteOneCharacteristic = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneCharacteristicInput;
}) => {
  await readOneCharacteristic({ tx, payload });

  return tx.goodsCharacteristic.delete({
    where: {
      id: payload.id,
    },
  });
};
