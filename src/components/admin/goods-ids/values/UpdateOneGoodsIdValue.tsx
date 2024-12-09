"use client";

import { api } from "~/trpc/react";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";
import { Modal } from "@mantine/core";
import { CreateOneIdValueInput } from "~/utils/validation/ids/values/createOneIdValue";
import { UpdateOneIdValueInput } from "~/utils/validation/ids/values/updateOneIdValue";
import { SingleGoodsIdValueForm } from "./SingleGoodsIdValueForm";

export function UpdateOneGoodsIdValue({
  id,
  close,
  onSuccess,
}: { id: string } & FormProps) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.ids.values.readOne.useQuery({ id });

  const { mutate, isPending } = api.ids.values.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.ids.values.readManyInfinite.invalidate(),
        apiUtils.ids.values.readOne.invalidate({ id }),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = (
    values: CreateOneIdValueInput | UpdateOneIdValueInput
  ) => {
    mutate({
      id,
      value: values.value,
      parentId: values.parentId,
    });
  };

  return (
    <SingleGoodsIdValueForm
      mode="update"
      initialValues={{
        id,
        parentId: data?.goodsIdId ?? "",
        value: data?.value ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
      close={close}
    />
  );
}

export function UpdateOneGoodsIdValueModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Изменить значение идентификатора товара"
    >
      <UpdateOneGoodsIdValue id={id} close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
