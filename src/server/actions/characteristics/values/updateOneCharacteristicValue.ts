import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { readOneCharacteristicValue } from "./readOneCharacteristicValue";
import { readOneCharacteristic } from "../readOneCharacteristic";

export const updateOneCharacteristicValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneCharacteristicValueInput;
}) => {
  await readOneCharacteristicValue({ tx, payload: { id: payload.id } });
  await readOneCharacteristic({ tx, payload: { id: payload.parentId } });

  return tx.goodsCharacteristicValue.update({
    where: {
      id: payload.id,
    },
    data: {
      value: payload.value,
      characteristicId: payload.parentId,
    },
  });
};
