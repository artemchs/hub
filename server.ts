import { createServer } from "http";
import { parse } from "url";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    }).listen(port, async () => {
        console.log(
            `🚀 Server running at http://localhost:${port}\n🔧 Mode: ${
                dev ? "development 👨‍💻" : process.env.NODE_ENV + " ✨"
            }`
        );

        try {
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/scheduler`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Error starting scheduler:", error);
            throw error;
        }
    });
});
