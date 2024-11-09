"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { SingleGoodsAttributeForm } from "./SingleGoodsAttributeForm";

export function CreateOneGoodsAttribute() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.attributes.createOne.useMutation({
    async onSuccess() {
      await apiUtils.attributes.readMany.invalidate();
      router.push("/admin/attributes");
    },
  });

  return (
    <SingleGoodsAttributeForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
    />
  );
}
