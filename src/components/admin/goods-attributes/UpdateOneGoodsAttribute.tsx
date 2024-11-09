"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneAttributeInput } from "~/utils/validation/attributes/createOneAttribute";
import { type UpdateOneAttributeInput } from "~/utils/validation/attributes/updateOneAttribute";
import { SingleGoodsAttributeForm } from "./SingleGoodsAttributeForm";

export function UpdateOneGoodsAttribute({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.attributes.readOne.useQuery({ id });

  const { mutate, isPending } = api.attributes.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.attributes.readMany.invalidate(),
        apiUtils.attributes.readOne.invalidate({ id }),
      ]);
      router.push("/admin/attributes");
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
    />
  );
}
