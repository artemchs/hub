import { type PrismaTransaction } from "~/server/db";
import { type ReadOneGoodsExportJobInput } from "~/utils/validation/goods/export/jobs";

export const readOneGoodsExportJob = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: ReadOneGoodsExportJobInput;
}) => {
    const goodsExportJob = await tx.goodsExportJob.findUnique({
        where: {
            id: payload.id,
        },
        include: {
            schema: true,
        },
    });

    if (!goodsExportJob) {
        throw new Error("Goods export job not found");
    }

    return goodsExportJob;
};
