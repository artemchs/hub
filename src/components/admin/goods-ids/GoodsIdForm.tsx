import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useEffect } from "react";
import {
  createOneIdSchema,
  type CreateOneIdInput,
} from "~/utils/validation/ids/createOneId";
import {
  updateOneIdSchema,
  type UpdateOneIdInput,
} from "~/utils/validation/ids/updateOneId";

interface GoodsIdFormProps {
  initialValues?: UpdateOneIdInput;
  onSubmit: (values: CreateOneIdInput | UpdateOneIdInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function GoodsIdForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
}: GoodsIdFormProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? { name: "" },
    validate: zodResolver(
      mode === "create" ? createOneIdSchema : updateOneIdSchema
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
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        form.onSubmit(onSubmit)(e);
      }}
      className="flex flex-col gap-4"
    >
      <TextInput
        withAsterisk
        label="Название"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="subtle" component={Link} href="/admin/ids">
          Отменить
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === "create" ? "Создать" : "Сохранить"}
        </Button>
      </Group>
    </form>
  );
}
