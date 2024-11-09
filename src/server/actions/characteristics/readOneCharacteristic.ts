import { type PrismaTransaction } from "~/server/db";
import { type ReadOneCharacteristicInput } from "~/utils/validation/characteristics/readOneCharacteristic";

export const readOneCharacteristic = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneCharacteristicInput;
}) => {
  const characteristic = await tx.goodsCharacteristic.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!characteristic) {
    throw new Error("Characteristic not found");
  }

  return characteristic;
};
