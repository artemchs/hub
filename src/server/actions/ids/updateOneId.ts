import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneIdInput } from "~/utils/validation/ids/updateOneId";
import { readOneId } from "./readOneId";

export const updateOneId = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneIdInput;
}) => {
  await readOneId({ tx, payload: { id: payload.id } });

  return tx.goodsId.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
    },
  });
};
