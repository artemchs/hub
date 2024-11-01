import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneAttributeInput } from "~/utils/validation/attributes/updateOneAttribute";
import { readOneAttribute } from "./readOneAttribute";

export const updateOneAttribute = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneAttributeInput;
}) => {
  await readOneAttribute({ tx, payload: { id: payload.id } });

  return tx.goodsAttribute.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
    },
  });
};
