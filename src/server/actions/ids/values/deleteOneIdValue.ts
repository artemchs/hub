import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneIdValueInput } from "~/utils/validation/ids/values/deleteOneIdValue";
import { readOneIdValue } from "./readOneIdValue";

export const deleteOneIdValue = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneIdValueInput;
}) => {
  await readOneIdValue({ tx, payload: { id: payload.id } });

  return tx.goodsIdValue.delete({
    where: {
      id: payload.id,
    },
  });
};
