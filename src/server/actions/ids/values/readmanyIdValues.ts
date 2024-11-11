import { type PrismaTransaction } from "~/server/db";
import { type ReadManyIdValuesInfiniteInput } from "~/utils/validation/ids/values/readManyIdValues";

export const readManyIdValuesInfinite = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyIdValuesInfiniteInput;
}) => {
  const items = await tx.goodsIdValue.findMany({
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
