"use client";

import { Button, FileButton, Group, Stack, Text } from "@mantine/core";
import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { IconUpload } from "@tabler/icons-react";
import {
  useMultipleUpload,
  useMultipleUploadWithKeys,
} from "~/hooks/useUpload";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function UploadGoodsMedia() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const {
    uploadMultipleFilesWithKeys,
    uploadMultipleFilesWithKeysPending,
    uploadMultipleFilesWithKeysStatus,
  } = useMultipleUploadWithKeys();
  const { mutateAsync, isPending } = api.media.createMany.useMutation({
    async onSuccess() {
      await apiUtils.media.readMany.invalidate();
      router.push("/admin/media");
    },
  });
  const columns = useMemo<MRT_ColumnDef<File>[]>(
    () => [
      { accessorKey: "name", header: "Название" },
      {
        id: "status",
        header: "Статус",
        Cell: ({ row }) => {
          const status = uploadMultipleFilesWithKeysStatus[row.original.name];
          if (status === "success") {
            return <Text c="green">Загружено</Text>;
          }
          if (status === "error") {
            return <Text c="red">Ошибка</Text>;
          }
          if (status === "pending") {
            return <Text c="blue">Ожидание</Text>;
          }
          return <Text c="gray">-</Text>;
        },
      },
      {
        accessorKey: "size",
        header: "Размер",
        Cell: ({ row }) => `${(row.original.size / 1024).toFixed(2)} KB`,
      },
      { accessorKey: "type", header: "Тип" },
    ],
    [uploadMultipleFilesWithKeysStatus]
  );
  const table = useMantineReactTable({
    localization: MRT_Localization_RU,
    columns,
    data: files,
    renderTopToolbarCustomActions: () => (
      <FileButton onChange={setFiles} accept="image/*" multiple>
        {(props) => (
          <Button variant="outline" {...props}>
            Добавить файлы
          </Button>
        )}
      </FileButton>
    ),
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    const res = await uploadMultipleFilesWithKeys({ dir: "Media", files });
    console.log(res);
    if (!res) return;
    await mutateAsync({
      files: res.map(({ key, fileName }) => ({ key, name: fileName })),
    });
    setFiles([]);
  };

  return (
    <Stack>
      <MantineReactTable table={table} />
      <Group justify="right">
        <Button
          leftSection={<IconUpload size={16} />}
          onClick={handleUpload}
          loading={uploadMultipleFilesWithKeysPending || isPending}
        >
          Загрузить
        </Button>
      </Group>
    </Stack>
  );
}
