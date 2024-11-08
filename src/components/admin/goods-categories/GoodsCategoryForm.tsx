import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { useEffect } from "react";
import {
  createOneCategorySchema,
  type CreateOneCategoryInput,
} from "~/utils/validation/categories/createOneCategory";
import {
  updateOneCategorySchema,
  type UpdateOneCategoryInput,
} from "~/utils/validation/categories/updateOneCategory";

interface GoodsCategoryFormProps {
  initialValues?: UpdateOneCategoryInput;
  onSubmit: (values: CreateOneCategoryInput | UpdateOneCategoryInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function GoodsCategoryForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
}: GoodsCategoryFormProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? { name: "" },
    validate: zodResolver(
      mode === "create" ? createOneCategorySchema : updateOneCategorySchema
    ),
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
      form.resetDirty(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInput
        withAsterisk
        label="Название"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="subtle" component={Link} href="/admin/categories">
          Отменить
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === "create" ? "Создать" : "Сохранить"}
        </Button>
      </Group>
    </form>
  );
}
