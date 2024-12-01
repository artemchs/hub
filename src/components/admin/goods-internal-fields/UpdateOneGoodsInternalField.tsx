"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { type CreateOneInternalFieldInput } from "~/utils/validation/internal-fields/createOneInternalField";
import { type UpdateOneInternalFieldInput } from "~/utils/validation/internal-fields/updateOneInternalField";
import { SingleGoodsInternalFieldForm } from "./SingleGoodsInternalFieldForm";

export function UpdateOneGoodsInternalField({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.internalFields.readOne.useQuery({ id });

  const { mutate, isPending } = api.internalFields.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.internalFields.readMany.invalidate(),
        apiUtils.internalFields.readOne.invalidate({ id }),
      ]);
      router.push("/admin/internal-fields");
    },
  });

  const handleSubmit = (
    values: CreateOneInternalFieldInput | UpdateOneInternalFieldInput
  ) => {
    mutate({
      id,
      name: values.name,
    });
  };

  return (
    <SingleGoodsInternalFieldForm
      mode="update"
      initialValues={data}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}
