import { type Prisma } from "@prisma/client";
import { type PrismaTransaction } from "~/server/db";
import { mapColumnFilterToPrismaCondition } from "~/utils/table/mapColumnFilterToPrismaCondition";
import {
    ReadManyGoodsExportJobsInfiniteInput,
    type ReadManyGoodsExportJobsInput,
} from "~/utils/validation/goods/export/jobs";
import { ReadManyGoodsExportSchemasInfiniteInput } from "~/utils/validation/goods/export/schemas/readManyGoodsExportSchemas";

export const readManyGoodsExportJobs = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: ReadManyGoodsExportJobsInput;
}) => {
    const filterConditions =
        payload.columnFilters?.map(({ id, value }) =>
            mapColumnFilterToPrismaCondition({
                id,
                value,
                columnFilterFn: payload.columnFilterFns[id] ?? "equals",
            })
        ) || [];

    const where: Prisma.GoodsExportJobWhereInput = {
        AND: filterConditions.length > 0 ? filterConditions : undefined,
    };

    const orderBy = payload.sorting.map((sort) => ({
        [sort.id]: sort.desc ? "desc" : "asc",
    }));

    const [items, total] = await Promise.all([
        tx.goodsExportJob.findMany({
            skip: payload.pagination.pageIndex * payload.pagination.pageSize,
            take: payload.pagination.pageSize,
            where,
            orderBy,
            include: {
                schema: true,
            },
        }),
        tx.goodsExportJob.count({ where }),
    ]);

    return {
        items,
        total,
        pageCount: Math.ceil(total / payload.pagination.pageSize),
    };
};

export const readManyGoodsExportJobsInfinite = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: ReadManyGoodsExportJobsInfiniteInput;
}) => {
    const items = await tx.goodsExportJob.findMany({
        take: payload.limit + 1,
        where: {
            name: {
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
