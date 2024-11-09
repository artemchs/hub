import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { useEffect } from "react";
import {
  type UpdateOneCharacteristicInput,
  updateOneCharacteristicSchema,
} from "~/utils/validation/characteristics/updateOneCharacteristic";
import {
  type CreateOneCharacteristicInput,
  createOneCharacteristicSchema,
} from "~/utils/validation/characteristics/createOneCharacteristic";

interface SingleGoodsCharacteristicFormProps {
  initialValues?: UpdateOneCharacteristicInput;
  onSubmit: (
    values: CreateOneCharacteristicInput | UpdateOneCharacteristicInput
  ) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function SingleGoodsCharacteristicForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
}: SingleGoodsCharacteristicFormProps) {
  const form = useForm({
    mode: "controlled",
    initialValues: initialValues ?? { name: "" },
    validate: zodResolver(
      mode === "create"
        ? createOneCharacteristicSchema
        : updateOneCharacteristicSchema
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
