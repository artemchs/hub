"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type CreateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/createOneCharacteristicValue";
import { type UpdateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { SingleGoodsInternalFieldValueForm } from "./SingleGoodsInternalFieldValueForm";
import { UpdateOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/updateOneInternalFieldValue";

export function UpdateOneGoodsInternalFieldValueModal({
  id,
  opened,
  close,
}: {
  id: string;
  opened: boolean;
  close: () => void;
}) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.internalFields.values.readOne.useQuery({
    id,
  });

  const { mutate, isPending } = api.internalFields.values.updateOne.useMutation(
    {
      async onSuccess() {
        await Promise.all([
          apiUtils.internalFields.values.readManyInfinite.invalidate(),
          apiUtils.internalFields.values.readOne.invalidate({ id }),
        ]);
        close();
      },
    }
  );

  const handleSubmit = (values: UpdateOneInternalFieldValueInput) => {
    mutate({
      id,
      parentId: values.parentId,
      value: values.value,
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Изменить значение поля">
      <SingleGoodsInternalFieldValueForm
        mode="update"
        initialValues={{
          id,
          parentId: data?.fieldId ?? "",
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
