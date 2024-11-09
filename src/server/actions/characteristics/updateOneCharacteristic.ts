import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneCharacteristicInput } from "~/utils/validation/characteristics/updateOneCharacteristic";
import { readOneCharacteristic } from "./readOneCharacteristic";

export const updateOneCharacteristic = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneCharacteristicInput;
}) => {
  await readOneCharacteristic({ tx, payload: { id: payload.id } });

  return tx.goodsCharacteristic.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
    },
  });
};
