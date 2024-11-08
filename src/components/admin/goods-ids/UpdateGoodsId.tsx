"use client";

import { api } from "~/trpc/react";
import { GoodsIdForm } from "./GoodsIdForm";
import { type CreateOneIdInput } from "~/utils/validation/ids/createOneId";
import { type UpdateOneIdInput } from "~/utils/validation/ids/updateOneId";
import { useRouter } from "next/navigation";

export function UpdateGoodsId({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.ids.readOne.useQuery({ id });

  const { mutate, isPending } = api.ids.updateOne.useMutation({
    async onSuccess() {
      await apiUtils.ids.readMany.invalidate();
      router.push("/admin/ids");
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
    />
  );
}
