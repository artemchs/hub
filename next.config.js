/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    output: "standalone",
    experimental: {
        optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME ?? "",
                port: "",
                pathname: "/Media/**",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default config;
