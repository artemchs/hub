import type { PrismaTransaction } from "~/server/db";
import type { UpdateOneInternalFieldInput } from "~/utils/validation/internal-fields/updateOneInternalField";
import { readOneInternalField } from "./readOneInternalField";

interface UpdateOneInternalFieldParams {
  tx: PrismaTransaction;
  payload: UpdateOneInternalFieldInput;
}

export const updateOneInternalField = async ({
  tx,
  payload,
}: UpdateOneInternalFieldParams) => {
  await readOneInternalField({ tx, payload: { id: payload.id } });

  return await tx.goodsInternalField.update({
    where: { id: payload.id },
    data: {
      name: payload.name,
    },
  });
};
