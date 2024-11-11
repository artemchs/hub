import { type PrismaTransaction } from "~/server/db";
import { type CreateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/createOneCharacteristicValue";
import { readOneCharacteristic } from "../readOneCharacteristic";

export const createOneCharacteristicValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneCharacteristicValueInput;
}) => {
  await readOneCharacteristic({ tx, payload: { id: payload.parentId } });

  return tx.goodsCharacteristicValue.create({
    data: {
      value: payload.value,
      characteristicId: payload.parentId,
    },
  });
};
