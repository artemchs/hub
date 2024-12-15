import { exportCronJobsManager } from "./export/exportCronJobsManager";
// Import other cron job managers as you create them
// import { anotherCronJobsManager } from "./another/anotherCronJobsManager";

/**
 * Starts all cron jobs by initializing their managers.
 */
export function startCronJobs(): void {
    // Initialize the export cron jobs manager
    exportCronJobsManager.initialize().catch((error) => {
        console.error("Failed to start export cron jobs:", error);
    });

    // Initialize other cron job managers as needed
    // anotherCronJobsManager.initialize().catch((error) => {
    //   console.error("Failed to start another cron jobs:", error);
    // });
}
