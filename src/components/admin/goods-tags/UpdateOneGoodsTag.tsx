"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { type CreateOneTagInput } from "~/utils/validation/tags/createOneTag";
import { type UpdateOneTagInput } from "~/utils/validation/tags/udpateOneTag";
import { SingleGoodsTagForm } from "./SingleGoodsTagForm";
import { FormProps } from "~/types/forms";
import { Modal } from "@mantine/core";
import { ModalProps } from "~/types/modals";

export function UpdateOneGoodsTag({
  id,
  close,
  onSuccess,
}: { id: string } & FormProps) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.tags.readOne.useQuery({ id });

  const { mutate, isPending } = api.tags.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.tags.readMany.invalidate(),
        apiUtils.tags.readManyInfinite.invalidate(),
        apiUtils.tags.readOne.invalidate({ id }),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = (values: CreateOneTagInput | UpdateOneTagInput) => {
    mutate({
      id,
      name: values.name,
    });
  };

  return (
    <SingleGoodsTagForm
      close={close}
      mode="update"
      initialValues={data}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}

export function UpdateOneGoodsTagModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal opened={opened ?? false} onClose={close} title="Изменить тег товара">
      <UpdateOneGoodsTag id={id} close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
