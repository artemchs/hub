"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { type CreateOneTagInput } from "~/utils/validation/tags/createOneTag";
import { type UpdateOneTagInput } from "~/utils/validation/tags/udpateOneTag";
import { SingleGoodsTagForm } from "./SingleGoodsTagForm";

export function UpdateOneGoodsTag({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.tags.readOne.useQuery({ id });

  const { mutate, isPending } = api.tags.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.tags.readMany.invalidate(),
        apiUtils.tags.readOne.invalidate({ id }),
      ]);
      router.push("/admin/tags");
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
      mode="update"
      initialValues={data}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}
