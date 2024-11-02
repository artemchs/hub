import "~/styles/globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import theme from "./theme";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Hub",
  description: "Hub",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body className="antialiased">
        {/* @ts-expect-error asdf */}
        <MantineProvider theme={theme}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
