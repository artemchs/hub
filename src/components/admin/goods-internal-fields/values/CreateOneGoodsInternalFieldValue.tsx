"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type UpdateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { UpdateOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/updateOneInternalFieldValue";
import { SingleGoodsInternalFieldValueForm } from "./SingleGoodsInternalFieldValueForm";

export function CreateOneGoodsInternalFieldValueModal({
  opened,
  close,
  initialValues,
}: {
  opened: boolean;
  close: () => void;
  initialValues?: UpdateOneInternalFieldValueInput;
}) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.internalFields.values.createOne.useMutation(
    {
      async onSuccess() {
        await apiUtils.internalFields.values.readManyInfinite.invalidate();
        close();
      },
    }
  );

  return (
    <Modal opened={opened} onClose={close} title="Создать значение поля">
      <SingleGoodsInternalFieldValueForm
        initialValues={initialValues}
        mode="create"
        onSubmit={mutate}
        isPending={isPending}
        close={close}
      />
    </Modal>
  );
}
