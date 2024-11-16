// CreateOneGoodsAttributeValue.tsx
"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { SingleGoodsAttributeValueForm } from "./SingleGoodsAttributeValueForm";
import { type UpdateOneAttributeValueInput } from "~/utils/validation/attributes/values/updateOneAttributeValue";

export function CreateOneGoodsAttributeValueModal({
  opened,
  close,
  initialValues,
}: {
  opened: boolean;
  close: () => void;
  initialValues?: UpdateOneAttributeValueInput;
}) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.attributes.values.createOne.useMutation({
    async onSuccess() {
      await apiUtils.attributes.values.readManyInfinite.invalidate();
      close();
    },
  });

  return (
    <Modal

      opened={opened}
      onClose={close}
      title="Создать значение атрибута"
    >
      <SingleGoodsAttributeValueForm
        initialValues={initialValues}
        mode="create"
        onSubmit={mutate}
        isPending={isPending}
        close={close}
      />
    </Modal>
  );
}
