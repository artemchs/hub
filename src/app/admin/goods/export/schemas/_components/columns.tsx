"use client";

import { Button, CopyButton } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { createMRTColumnHelper } from "mantine-react-table";
import { DisplayDate } from "~/components/DisplayDate";
import { env } from "~/env";
import { type RouterOutputs } from "~/trpc/react";

const columnHelper =
  createMRTColumnHelper<
    RouterOutputs["goods"]["export"]["schemas"]["readMany"]["items"][number]
  >();

export const goodsExportSchemasColumns = [
  columnHelper.accessor((row) => row.name, {
    header: "Название",
    id: "name",
  }),
  columnHelper.accessor((row) => row.id, {
    header: "Постоянная ссылка на экспорт",
    id: "export-link",
    Cell: ({ row }) => {
      return (
        <CopyButton value={`${env.NEXTAUTH_URL}/api/export/${row.original.id}`}>
          {({ copied, copy }) => (
            <Button
              leftSection={
                copied ? (
                  <IconCheck className="h-4 w-4" />
                ) : (
                  <IconCopy className="h-4 w-4" />
                )
              }
              color={copied ? "teal" : "dark"}
              onClick={copy}
              size="compact-sm"
              variant="subtle"
            >
              Скопировать
            </Button>
          )}
        </CopyButton>
      );
    },
  }),
  columnHelper.accessor((row) => row.createdAt, {
    header: "Дата создания",
    Cell: ({ row }) => <DisplayDate date={row.original.updatedAt} />,
    filterVariant: "date-range",
    id: "createdAt",
  }),
  columnHelper.accessor((row) => row.updatedAt, {
    header: "Дата обновления",
    Cell: ({ row }) => <DisplayDate date={row.original.updatedAt} />,
    filterVariant: "date-range",
    id: "updatedAt",
  }),
];
