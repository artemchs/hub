import { NextResponse } from "next/server";
import { exportCronJobsManager } from "~/server/utils/cron/export/exportCronJobsManager";

export async function POST() {
    try {
        await exportCronJobsManager.initialize();
        console.log("Export cron jobs initialized.");

        return NextResponse.json({ data: "Success", status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
