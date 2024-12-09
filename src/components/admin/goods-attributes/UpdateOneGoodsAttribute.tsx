"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneAttributeInput } from "~/utils/validation/attributes/createOneAttribute";
import { type UpdateOneAttributeInput } from "~/utils/validation/attributes/updateOneAttribute";
import { SingleGoodsAttributeForm } from "./SingleGoodsAttributeForm";
import { FormProps } from "~/types/forms";
import { Modal } from "@mantine/core";
import { ModalProps } from "~/types/modals";

export function UpdateOneGoodsAttribute({
  id,
  close,
  onSuccess,
}: { id: string } & FormProps) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.attributes.readOne.useQuery({ id });

  const { mutate, isPending } = api.attributes.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.attributes.readMany.invalidate(),
        apiUtils.attributes.readManyInfinite.invalidate(),
        apiUtils.attributes.readOne.invalidate({ id }),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = (
    values: CreateOneAttributeInput | UpdateOneAttributeInput
  ) => {
    mutate({
      id,
      name: values.name,
    });
  };

  return (
    <SingleGoodsAttributeForm
      mode="update"
      initialValues={{
        id,
        name: data?.name ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
      close={close}
    />
  );
}

export function UpdateOneGoodsAttributeModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Изменить атрибут товара"
    >
      <UpdateOneGoodsAttribute id={id} close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
