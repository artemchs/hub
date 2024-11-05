import "~/styles/globals.css";

import {
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
} from "@mantine/core";
import { breakpoints, colors } from "./theme";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Head from "next/head";
import MantineDatesProvider from "~/components/MantineDatesProvider";

export const metadata: Metadata = {
  title: "Hub",
  description: "Hub",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    breakpoints,
    colors,
  })
);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body className="antialiased bg-gray-50">
        <MantineProvider theme={theme}>
          <MantineDatesProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </MantineDatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
