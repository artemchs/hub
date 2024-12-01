import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { useEffect } from "react";
import { createOneInternalFieldSchema } from "~/utils/validation/internal-fields/createOneInternalField";
import {
  updateOneInternalFieldSchema,
  type UpdateOneInternalFieldInput,
} from "~/utils/validation/internal-fields/updateOneInternalField";
import { createOneInternalFieldValueSchema } from "~/utils/validation/internal-fields/values/createOneInternalFieldValue";
import {
  UpdateOneInternalFieldValueInput,
  updateOneInternalFieldValueSchema,
} from "~/utils/validation/internal-fields/values/updateOneInternalFieldValue";
import { GoodsInternalFieldCombobox } from "../GoodsInternalFieldCombobox";

interface SingleGoodsInternalFieldValueFormProps {
  initialValues?: UpdateOneInternalFieldValueInput;
  onSubmit: (values: UpdateOneInternalFieldValueInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
  close: () => void;
}

export function SingleGoodsInternalFieldValueForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
  close,
}: SingleGoodsInternalFieldValueFormProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? { value: "", parentId: "" },
    validate: zodResolver(
      mode === "create"
        ? createOneInternalFieldValueSchema
        : updateOneInternalFieldValueSchema
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
      <GoodsInternalFieldCombobox
        id={form.values.parentId}
        setId={(id) => form.setFieldValue("parentId", id!)}
        label="Поле"
      />
      <TextInput
        withAsterisk
        label="Значение"
        key={form.key("value")}
        {...form.getInputProps("value")}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="subtle" onClick={close}>
          Отменить
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === "create" ? "Создать" : "Сохранить"}
        </Button>
      </Group>
    </form>
  );
}
