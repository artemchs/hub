import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { startCronJobs } from "./src/server/utils/cron/startCronJobs";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    }).listen(port);

    console.log(
        `🚀 Server running at http://localhost:${port}\n🔧 Mode: ${
            dev ? "development 👨‍💻" : process.env.NODE_ENV + " ✨"
        }`
    );

    startCronJobs();
});
