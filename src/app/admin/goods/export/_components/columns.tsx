"use client";

import { Button, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { createMRTColumnHelper } from "mantine-react-table";
import { DisplayOneGoodsExportSchemaName } from "~/components/admin/goods/export/schemas/DisplayOneGoodsExportSchemaName";
import { DisplayDate } from "~/components/DisplayDate";
import { env } from "~/env";
import { type RouterOutputs } from "~/trpc/react";
import { getAsyncJobStatusUserMessage } from "~/utils/miscellaneous/getAsyncJobStatusUserMessage";

const columnHelper =
  createMRTColumnHelper<
    RouterOutputs["goods"]["export"]["readMany"]["items"][number]
  >();

export const goodsExportColumns = [
  columnHelper.accessor((row) => row.schemaId, {
    header: "Схема",
    id: "schemaId",
    Cell: ({ row }) => (
      <DisplayOneGoodsExportSchemaName id={row.original.schemaId} />
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    header: "Статус",
    id: "status",
    Cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Text
          c={
            status === "COMPLETED"
              ? "green"
              : status === "FAILED"
                ? "red"
                : status === "PENDING"
                  ? "orange"
                  : status === "PROCESSING"
                    ? "blue"
                    : "dark"
          }
        >
          {getAsyncJobStatusUserMessage(status)}
        </Text>
      );
    },
  }),
  columnHelper.accessor((row) => row.fileKey, {
    header: "Файл",
    id: "fileKey",
    Cell: ({ row }) => {
      const status = row.original.status;

      if (status === "COMPLETED") {
        return (
          <Button
            component="a"
            variant="subtle"
            color="green"
            size="xs"
            leftSection={<IconDownload size={16} />}
            href={`https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${row.original.fileKey}`}
            target="_blank"
          >
            Скачать
          </Button>
        );
      }

      return null;
    },
  }),
  columnHelper.accessor((row) => row.createdAt, {
    header: "Дата создания",
    Cell: ({ row }) => <DisplayDate date={row.original.updatedAt} />,
    filterVariant: "date-range",
    id: "createdAt",
  }),
];
