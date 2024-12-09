import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { FormProps } from "~/types/forms";
import {
  CreateOneIdValueInput,
  createOneIdValueSchema,
} from "~/utils/validation/ids/values/createOneIdValue";
import {
  UpdateOneIdValueInput,
  updateOneIdValueSchema,
} from "~/utils/validation/ids/values/updateOneIdValue";
import { GoodsIdCombobox } from "../GoodsIdCombobox";
import { Button, Group, TextInput } from "@mantine/core";

interface SingleGoodsIdValueFormProps extends FormProps {
  initialValues?: UpdateOneIdValueInput;
  onSubmit: (values: CreateOneIdValueInput | UpdateOneIdValueInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function SingleGoodsIdValueForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
  close,
}: SingleGoodsIdValueFormProps) {
  const form = useForm({
    mode: "controlled",
    initialValues: initialValues ?? { value: "", parentId: "" },
    validate: zodResolver(
      mode === "create" ? createOneIdValueSchema : updateOneIdValueSchema
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
      <GoodsIdCombobox
        id={form.values.parentId}
        setId={(id) => form.setFieldValue("parentId", id!)}
        label="Идентификатор"
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
