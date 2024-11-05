"use client";

import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import {
  type CreateOneIdInput,
  createOneIdSchema,
} from "~/utils/validation/ids/createOneId";
import { Button, Group, TextInput } from "@mantine/core";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function CreateOneGoodsIdForm() {
  const router = useRouter();

  const form = useForm<CreateOneIdInput>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: zodResolver(createOneIdSchema),
  });

  const apiUtils = api.useUtils();
  const { mutate, isPending } = api.ids.createOne.useMutation({
    async onSuccess() {
      router.push("/admin/ids");
      await apiUtils.ids.readMany.invalidate();
    },
  });

  function onSubmit(values: CreateOneIdInput) {
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
          Создать
        </Button>
      </Group>
    </form>
  );
}
