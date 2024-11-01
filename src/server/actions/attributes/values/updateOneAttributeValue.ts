import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneAttributeValueInput } from "~/utils/validation/attributes/values/updateOneAttributeValue";
import { readOneAttributeValue } from "./readOneAttributeValue";
import { readOneAttribute } from "../readOneAttribute";

export const updateOneAttributeValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneAttributeValueInput;
}) => {
  await readOneAttributeValue({ tx, payload: { id: payload.id } });
  await readOneAttribute({ tx, payload: { id: payload.parentId } });

  return tx.goodsAttributeValue.update({
    where: {
      id: payload.id,
    },
    data: {
      value: payload.value,
      attributeId: payload.parentId,
    },
  });
};
