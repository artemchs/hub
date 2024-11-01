import { type PrismaTransaction } from "~/server/db";
import { type CreateOneAttributeValueInput } from "~/utils/validation/attributes/values/createOneAttributeValue";
import { readOneAttribute } from "../readOneAttribute";

export const createOneAttributeValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneAttributeValueInput;
}) => {
  await readOneAttribute({ tx, payload: { id: payload.parentId } });

  return tx.goodsAttributeValue.create({
    data: {
      value: payload.value,
      attributeId: payload.parentId,
    },
  });
};
