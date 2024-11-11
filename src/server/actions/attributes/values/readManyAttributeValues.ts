import { type PrismaTransaction } from "~/server/db";
import { type ReadManyAttributeValuesInfiniteInput } from "~/utils/validation/attributes/values/readManyAttributeValues";

export const readManyAttributeValuesInfinite = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyAttributeValuesInfiniteInput;
}) => {
  const items = await tx.goodsAttributeValue.findMany({
    take: payload.limit + 1,
    where: {
      value: {
        contains: payload.globalFilter,
        mode: "insensitive",
      },
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
