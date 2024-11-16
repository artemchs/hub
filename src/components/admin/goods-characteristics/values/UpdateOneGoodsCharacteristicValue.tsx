// UpdateOneGoodsCharacteristicValue.tsx
"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type CreateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/createOneCharacteristicValue";
import { type UpdateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { SingleGoodsCharacteristicValueForm } from "./SingleGoodsCharacteristicValueForm";

export function UpdateOneGoodsCharacteristicValueModal({
  id,
  opened,
  close,
}: {
  id: string;
  opened: boolean;
  close: () => void;
}) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.characteristics.values.readOne.useQuery({
    id,
  });

  const { mutate, isPending } =
    api.characteristics.values.updateOne.useMutation({
      async onSuccess() {
        await Promise.all([
          apiUtils.characteristics.values.readManyInfinite.invalidate(),
          apiUtils.characteristics.values.readOne.invalidate({ id }),
        ]);
        close();
      },
    });

  const handleSubmit = (
    values:
      | CreateOneCharacteristicValueInput
      | UpdateOneCharacteristicValueInput
  ) => {
    mutate({
      id,
      parentId: values.parentId,
      value: values.value,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Изменить значение характеристики"
    >
      <SingleGoodsCharacteristicValueForm
        mode="update"
        initialValues={{
          id,
          parentId: data?.characteristicId ?? "",
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
