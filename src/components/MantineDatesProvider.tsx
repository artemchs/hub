"use client";

import React from "react";
import "dayjs/locale/ru";
import { DatesProvider } from "@mantine/dates";

export default function MantineDatesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DatesProvider
      settings={{
        locale: "ru",
        firstDayOfWeek: 0,
        weekendDays: [0],
        timezone: "UTC",
      }}
    >
      {children}
    </DatesProvider>
  );
}
