import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneGoodInput } from "~/utils/validation/goods/updateOneGood";
import { readOneGood } from "./readOneGood";
import { checkDbRecordsForGood } from "./checkDbRecordsForGood";

export const updateOneGood = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneGoodInput;
}) => {
  await readOneGood({ tx, payload: { id: payload.id } });
  const { mediaIds } = await checkDbRecordsForGood({ tx, payload });

  return tx.good.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
      sku: payload.sku,
      description: payload.description,
      fullPrice: payload.fullPrice,
      price: payload.price,
      quantity: payload.quantity,
      categoryId: payload.categoryId,
      attributeValues: {
        set: payload.attributeValueIds?.map((id) => ({ id })),
      },
      idValues: {
        set: payload.idValueIds?.map((id) => ({ id })),
      },
      mediaToGood: {
        deleteMany: {
          goodId: payload.id,
        },
        createMany: {
          data: mediaIds.map((id, index) => ({
            mediaId: id,
            index,
          })),
        },
      },
    },
  });
};
