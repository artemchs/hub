"use client";

import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { api, type RouterOutputs } from "~/trpc/react";
import { useRouter } from "next/navigation";
import {
  type UpdateOneIdInput,
  updateOneIdSchema,
} from "~/utils/validation/ids/updateOneId";
import { useEffect } from "react";

export function UpdateOneGoodsIdForm({
  data,
}: {
  data?: RouterOutputs["ids"]["readOne"];
}) {
  const router = useRouter();

  const form = useForm<UpdateOneIdInput>({
    mode: "uncontrolled",
    initialValues: {
      id: "",
      name: "",
    },
    validate: zodResolver(updateOneIdSchema),
  });

  useEffect(() => {
    if (data) {
      const values: UpdateOneIdInput = {
        id: data.id,
        name: data.name,
      };

      form.setValues(values);
      form.resetDirty(values);
    }
  }, [data]);

  const apiUtils = api.useUtils();
  const { mutate, isPending } = api.ids.updateOne.useMutation({
    async onSuccess() {
      router.push("/admin/ids");
      await apiUtils.ids.readMany.invalidate();
    },
  });

  function onSubmit(values: UpdateOneIdInput) {
    mutate(values);
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        withAsterisk
        label="Название"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="subtle">Отменить</Button>
        <Button type="submit" loading={isPending}>
          Сохранить
        </Button>
      </Group>
    </form>
  );
}
