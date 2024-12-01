"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { SingleGoodsInternalFieldForm } from "./SingleGoodsInternalFieldForm";

export function CreateOneGoodsInternalField() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.internalFields.createOne.useMutation({
    async onSuccess() {
      await apiUtils.internalFields.readMany.invalidate();
      router.push("/admin/internal-fields");
    },
  });

  return (
    <SingleGoodsInternalFieldForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
    />
  );
}
