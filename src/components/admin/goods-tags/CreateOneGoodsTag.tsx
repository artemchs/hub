"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { SingleGoodsTagForm } from "./SingleGoodsTagForm";

export function CreateOneGoodsTag() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.tags.createOne.useMutation({
    async onSuccess() {
      await apiUtils.tags.readMany.invalidate();
      router.push("/admin/tags");
    },
  });

  return (
    <SingleGoodsTagForm mode="create" onSubmit={mutate} isPending={isPending} />
  );
}
