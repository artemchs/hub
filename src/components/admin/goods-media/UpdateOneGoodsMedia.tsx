"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneMediaInput } from "~/utils/validation/media/createOneMedia";
import { type UpdateOneMediaInput } from "~/utils/validation/media/updateOneMedia";
import { SingleGoodsMediaForm } from "./SingleGoodsMediaForm";

export function UpdateOneGoodsMedia({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.media.readOne.useQuery({ id });

  const { mutate, isPending } = api.media.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.media.readMany.invalidate(),
        apiUtils.media.readOne.invalidate({ id }),
      ]);
      router.push("/admin/media");
    },
  });

  const handleSubmit = (values: CreateOneMediaInput | UpdateOneMediaInput) => {
    mutate({
      id,
      key: values.key,
      name: values.name,
    });
  };

  return (
    <SingleGoodsMediaForm
      mode="update"
      initialValues={{
        id,
        key: data?.key ?? "",
        name: data?.name ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}
