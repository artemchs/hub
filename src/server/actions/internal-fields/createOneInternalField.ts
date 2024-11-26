import type { PrismaTransaction } from "~/server/db";
import type { CreateOneInternalFieldInput } from "~/utils/validation/internal-fields/createOneInternalField";

interface CreateOneInternalFieldParams {
  tx: PrismaTransaction;
  payload: CreateOneInternalFieldInput;
}

export const createOneInternalField = async ({
  tx,
  payload,
}: CreateOneInternalFieldParams) => {
  return await tx.goodsInternalField.create({
    data: {
      name: payload.name,
    },
  });
};
