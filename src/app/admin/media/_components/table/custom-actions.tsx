import { Box, Button } from "@mantine/core";
import { IconPlus, IconUpload } from "@tabler/icons-react";
import type { MRT_TableInstance } from "mantine-react-table";
import Link from "next/link";
import type { RouterOutputs } from "~/trpc/react";

export function GoodsMediaTableCustomActions({
  table,
}: {
  table: MRT_TableInstance<RouterOutputs["media"]["readMany"]["items"][number]>;
}) {
  return (
    <Box className="flex items-center gap-2">
      <Button
        leftSection={<IconPlus className="h-4 w-4" />}
        component={Link}
        href="/admin/media/create"
      >
        Создать
      </Button>
      <Button
        variant="subtle"
        leftSection={<IconUpload size={16} />}
        component={Link}
        href="/admin/media/upload"
      >
        Загрузить
      </Button>
    </Box>
  );
}
