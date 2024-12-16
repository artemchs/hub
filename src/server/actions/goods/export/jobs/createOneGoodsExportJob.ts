import { type PrismaTransaction } from "~/server/db";
import { type CreateOneGoodsExportJobInput } from "~/utils/validation/goods/export/jobs";
import { readOneGoodsExportSchema } from "../schemas/readOneGoodsExportSchema";
import { exportCronJobsManager } from "~/server/utils/cron/export/exportCronJobsManager";

export const createOneGoodsExportJob = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: CreateOneGoodsExportJobInput;
}) => {
    const schema = await readOneGoodsExportSchema({
        tx,
        payload: { id: payload.schemaId },
    });

    const goodsExportJob = await tx.goodsExportJob.create({
        data: {
            name: payload.name,
            schedule: payload.schedule,
            schemaId: schema.id,
        },
    });

    exportCronJobsManager.setJob(goodsExportJob.id);

    return goodsExportJob;
};
