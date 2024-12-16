import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneGoodsExportJobInput } from "~/utils/validation/goods/export/jobs";
import { readOneGoodsExportSchema } from "../schemas/readOneGoodsExportSchema";
import { exportCronJobsManager } from "~/server/utils/cron/export/exportCronJobsManager";

export const updateOneGoodsExportJob = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: UpdateOneGoodsExportJobInput;
}) => {
    const schema = await readOneGoodsExportSchema({
        tx,
        payload: { id: payload.schemaId },
    });

    const goodsExportJob = await tx.goodsExportJob.update({
        where: {
            id: payload.id,
        },
        data: {
            name: payload.name,
            schedule: payload.schedule,
            schemaId: schema.id,
        },
    });

    exportCronJobsManager.setJob(goodsExportJob.id);

    return goodsExportJob;
};
