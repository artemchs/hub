import { type PrismaTransaction } from "~/server/db";
import { exportCronJobsManager } from "~/server/utils/cron/export/exportCronJobsManager";
import { type DeleteOneGoodsExportJobInput } from "~/utils/validation/goods/export/jobs";

export const deleteOneGoodsExportJob = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: DeleteOneGoodsExportJobInput;
}) => {
    await tx.goodsExportJob.delete({
        where: {
            id: payload.id,
        },
    });

    exportCronJobsManager.removeJob(payload.id);
};
