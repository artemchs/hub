import { type PrismaTransaction } from "~/server/db";
import { type ReadOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/readOneCharacteristicValue";

export const readOneCharacteristicValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneCharacteristicValueInput;
}) => {
  const characteristicValue = await tx.goodsCharacteristicValue.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!characteristicValue) {
    throw new Error("Characteristic value not found");
  }

  return characteristicValue;
};
