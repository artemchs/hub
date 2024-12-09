import { api } from "~/trpc/react";
import { FormProps } from "~/types/forms";
import { SingleGoodsIdValueForm } from "./SingleGoodsIdValueForm";
import { ModalProps } from "~/types/modals";
import { Modal } from "@mantine/core";

export function CreateOneGoodsIdValue({ close, onSuccess }: FormProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.ids.values.createOne.useMutation({
    async onSuccess() {
      await Promise.all([apiUtils.ids.values.readManyInfinite.invalidate()]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <SingleGoodsIdValueForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsIdValueModal({
  close,
  opened,
  onSuccess,
}: ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать новое значение идентификатора товара"
    >
      <CreateOneGoodsIdValue close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
