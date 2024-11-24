import { useForm, zodResolver } from "@mantine/form";
import { api } from "~/trpc/react";
import {
  CreateOneGoodsExportInput,
  createOneGoodsExportSchema,
} from "~/utils/validation/goods/export/createOneGoodsExport";
import { GoodsExportSchemaCombobox } from "./schemas/GoodsExportSchemaCombobox";
import { Button, Group } from "@mantine/core";
import Link from "next/link";

interface SingleGoodsExportFormProps {
  onSubmit: (values: CreateOneGoodsExportInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
}

export function SingleGoodsExportForm({
  onSubmit,
  isPending,
  isFetching,
}: SingleGoodsExportFormProps) {
  const apiUtils = api.useUtils();

  const form = useForm({
    mode: "controlled",
    validate: zodResolver(createOneGoodsExportSchema),
    initialValues: {
      schemaId: "",
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        form.onSubmit(onSubmit)(e);
      }}
      className="flex flex-col gap-4"
    >
      <GoodsExportSchemaCombobox
        withAsterisk
        id={form.values.schemaId}
        setId={(schemaId) => {
          form.setValues({
            ...form.values,
            schemaId: schemaId ?? "",
          });
        }}
        label="Схема экспорта"
      />
      <Group justify="flex-end" mt="md">
        <Button variant="subtle" component={Link} href="/admin/goods/export">
          Отменить
        </Button>
        <Button type="submit" loading={isPending}>
          Экспортировать
        </Button>
      </Group>
    </form>
  );
}
