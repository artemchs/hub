import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneIdInput } from "~/utils/validation/ids/deleteOneId";
import { readOneId } from "./readOneId";

export const deleteOneId = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneIdInput;
}) => {
  await readOneId({ tx, payload });

  return tx.goodsId.delete({
    where: {
      id: payload.id,
    },
  });
};
