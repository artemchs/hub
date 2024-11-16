import { type PrismaTransaction } from "~/server/db";
import { type ReadManyCharacteristicValuesInfiniteInput } from "~/utils/validation/characteristics/values/readManyCharacteristicValues";

export const readManyCharacteristicValuesInfinite = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyCharacteristicValuesInfiniteInput;
}) => {
  const items = await tx.goodsCharacteristicValue.findMany({
    take: payload.limit + 1,
    where: {
      value: {
        contains: payload.globalFilter,
        mode: "insensitive",
      },
      characteristicId: payload.parentId
        ? { equals: payload.parentId }
        : undefined,
    },
    cursor: payload.cursor ? { id: payload.cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  let nextCursor: typeof payload.cursor | undefined = undefined;
  if (items.length > payload.limit) {
    const nextItem = items.pop();
    nextCursor = nextItem!.id;
  }
  return {
    items,
    nextCursor,
  };
};
