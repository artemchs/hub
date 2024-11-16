import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import {
  type CreateOneAttributeValueInput,
  createOneAttributeValueSchema,
} from "~/utils/validation/attributes/values/createOneAttributeValue";
import {
  type UpdateOneAttributeValueInput,
  updateOneAttributeValueSchema,
} from "~/utils/validation/attributes/values/updateOneAttributeValue";
import { GoodsAttributesCombobox } from "../GoodsAttributeCombobox";

interface SingleGoodsAttributeValueFormProps {
  initialValues?: UpdateOneAttributeValueInput;
  onSubmit: (
    values: CreateOneAttributeValueInput | UpdateOneAttributeValueInput
  ) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
  close: () => void;
}

export function SingleGoodsAttributeValueForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
  close,
}: SingleGoodsAttributeValueFormProps) {
  const form = useForm({
    mode: "controlled",
    initialValues: initialValues ?? { value: "", parentId: "" },
    validate: zodResolver(
      mode === "create"
        ? createOneAttributeValueSchema
        : updateOneAttributeValueSchema
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
      <GoodsAttributesCombobox
        id={form.values.parentId}
        setId={(id) => form.setFieldValue("parentId", id!)}
        label="Атрибут"
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
