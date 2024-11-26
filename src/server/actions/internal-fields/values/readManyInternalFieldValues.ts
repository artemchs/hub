import { type PrismaTransaction } from "~/server/db";
import { type ReadManyInternalFieldValuesInfiniteInput } from "~/utils/validation/internal-fields/values/readManyInternalFieldValues";

interface ReadManyInternalFieldValuesPayload {
  tx: PrismaTransaction
  payload: ReadManyInternalFieldValuesInfiniteInput
}

export const readManyInternalFieldValuesInfinite = async ({
  tx,
  payload,
}: ReadManyInternalFieldValuesPayload) => {
  const items = await tx.goodsInternalFieldValue.findMany({
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
