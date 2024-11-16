import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { useEffect } from "react";
import {
  type CreateOneAttributeInput,
  createOneAttributeSchema,
} from "~/utils/validation/attributes/createOneAttribute";
import {
  type UpdateOneAttributeInput,
  updateOneAttributeSchema,
} from "~/utils/validation/attributes/updateOneAttribute";

interface SingleGoodsAttributeFormProps {
  initialValues?: UpdateOneAttributeInput;
  onSubmit: (values: CreateOneAttributeInput | UpdateOneAttributeInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function SingleGoodsAttributeForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
}: SingleGoodsAttributeFormProps) {
  const form = useForm({
    mode: "controlled",
    initialValues: initialValues ?? { name: "" },
    validate: zodResolver(
      mode === "create" ? createOneAttributeSchema : updateOneAttributeSchema
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
        <Button variant="subtle" component={Link} href="/admin/attributes">
          Отменить
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === "create" ? "Создать" : "Сохранить"}
        </Button>
      </Group>
    </form>
  );
}
