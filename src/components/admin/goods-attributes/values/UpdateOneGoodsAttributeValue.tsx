// UpdateOneGoodsAttributeValue.tsx
"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type CreateOneAttributeValueInput } from "~/utils/validation/attributes/values/createOneAttributeValue";
import { type UpdateOneAttributeValueInput } from "~/utils/validation/attributes/values/updateOneAttributeValue";
import { SingleGoodsAttributeValueForm } from "./SingleGoodsAttributeValueForm";

export function UpdateOneGoodsAttributeValueModal({
  id,
  opened,
  close,
}: {
  id: string;
  opened: boolean;
  close: () => void;
}) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.attributes.values.readOne.useQuery({ id });

  const { mutate, isPending } = api.attributes.values.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.attributes.values.readManyInfinite.invalidate(),
        apiUtils.attributes.values.readOne.invalidate({ id }),
      ]);
      close();
    },
  });

  const handleSubmit = (
    values: CreateOneAttributeValueInput | UpdateOneAttributeValueInput
  ) => {
    mutate({
      id,
      parentId: values.parentId,
      value: values.value,
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Изменить значение атрибута">
      <SingleGoodsAttributeValueForm
        mode="update"
        initialValues={{
          id,
          parentId: data?.attributeId ?? "",
          value: data?.value ?? "",
        }}
        onSubmit={handleSubmit}
        isPending={isPending}
        isFetching={isFetching}
        close={close}
      />
    </Modal>
  );
}
