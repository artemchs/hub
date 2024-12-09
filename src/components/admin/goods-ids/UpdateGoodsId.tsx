"use client";

import { api } from "~/trpc/react";
import { GoodsIdForm } from "./GoodsIdForm";
import { type CreateOneIdInput } from "~/utils/validation/ids/createOneId";
import { type UpdateOneIdInput } from "~/utils/validation/ids/updateOneId";
import { useRouter } from "next/navigation";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";
import { Modal } from "@mantine/core";

export function UpdateGoodsId({
  id,
  close,
  onSuccess,
}: { id: string } & FormProps) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.ids.readOne.useQuery({ id });

  const { mutate, isPending } = api.ids.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.ids.readMany.invalidate(),
        apiUtils.ids.readManyInfinite.invalidate(),
        apiUtils.ids.readOne.invalidate({ id }),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = (values: CreateOneIdInput | UpdateOneIdInput) => {
    mutate({
      id,
      name: values.name,
    });
  };

  return (
    <GoodsIdForm
      mode="update"
      initialValues={data}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
      close={close}
    />
  );
}

export function UpdateGoodsIdModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Изменить идентификатор товара"
    >
      <UpdateGoodsId id={id} close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
