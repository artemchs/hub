import { type PrismaTransaction } from "~/server/db";
import { type CreateOneCharacteristicInput } from "~/utils/validation/characteristics/createOneCharacteristic";

export const createOneCharacteristic = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneCharacteristicInput;
}) => {
  return tx.goodsCharacteristic.create({
    data: payload,
  });
};
