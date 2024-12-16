import { CronJob } from "cron";
import { db } from "~/server/db";
import { createOneGoodsExport } from "~/server/actions/goods/export/createOneGoodsExport";
import { storage } from "~/server/storage";

/**
 * Singleton class that manages goods export cron jobs.
 */
class ExportCronJobsManager {
    private static instance: ExportCronJobsManager;
    private jobs: Map<string, CronJob> = new Map();
    private isInitialized = false;

    /**
     * Private constructor to prevent direct instantiation.
     */
    private constructor() {
        // Constructor is empty; initialization is done via initialize()
    }

    /**
     * Gets the singleton instance of the manager.
     * @returns The singleton instance.
     */
    public static getInstance(): ExportCronJobsManager {
        if (!ExportCronJobsManager.instance) {
            ExportCronJobsManager.instance = new ExportCronJobsManager();
        }
        return ExportCronJobsManager.instance;
    }

    /**
     * Initializes the manager by loading existing jobs from the database.
     * @returns A promise that resolves when initialization is complete.
     */
    public async initialize(): Promise<void> {
        if (this.isInitialized) {
            return;
        }

        this.isInitialized = true;

        try {
            const goodsExportJobs = await db.goodsExportJob.findMany();
            for (const { id, schedule } of goodsExportJobs) {
                this.scheduleJob(id, schedule);
            }
            console.log("ExportCronJobsManager initialized successfully.");
        } catch (error) {
            console.error("Error initializing ExportCronJobsManager:", error);
            throw error;
        }
    }

    /**
     * Schedules a new cron job.
     * @param id - The job ID.
     * @param schedule - The cron schedule expression.
     */
    private scheduleJob(id: string, schedule: string): void {
        const job = new CronJob(schedule, () => this.executeJob(id));
        this.jobs.set(id, job);
        job.start();
        console.log(`Scheduled job with ID: ${id}`);
    }

    /**
     * Executes the export job.
     * @param id - The job ID.
     */
    private async executeJob(id: string): Promise<void> {
        const job = await db.goodsExportJob.findUnique({ where: { id } });
        if (!job) {
            // Job not found, exit silently.
            return;
        }
        await createOneGoodsExport({
            tx: db,
            payload: { schemaId: job.schemaId },
            storage: storage,
        });
    }

    /**
     * Adds or updates a cron job.
     * @param id - The job ID.
     */
    public async setJob(id: string): Promise<void> {
        const goodsExportJob = await db.goodsExportJob.findUnique({
            where: { id },
        });
        if (!goodsExportJob) {
            // Remove the job if it exists.
            this.removeJob(id);
            return;
        }

        // Remove existing job if it exists.
        this.removeJob(id);

        // Schedule the new job.
        this.scheduleJob(id, goodsExportJob.schedule);
    }

    /**
     * Removes a scheduled cron job.
     * @param id - The job ID to remove.
     */
    public removeJob(id: string): void {
        const job = this.jobs.get(id);
        if (job) {
            job.stop();
            this.jobs.delete(id);
            console.log(`Removed job with ID: ${id}`);
        }
    }

    /**
     * Gets the list of all scheduled job IDs.
     * @returns An array of job IDs.
     */
    public getJobIds(): string[] {
        return Array.from(this.jobs.keys());
    }
}

// Export the singleton instance
export const exportCronJobsManager = ExportCronJobsManager.getInstance();
