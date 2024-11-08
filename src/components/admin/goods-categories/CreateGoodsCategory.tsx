"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { GoodsCategoryForm } from "./GoodsCategoryForm";

export function CreateGoodsCategory() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.categories.createOne.useMutation({
    async onSuccess() {
      await apiUtils.categories.readMany.invalidate();
      router.push("/admin/categories");
    },
  });

  return (
    <GoodsCategoryForm mode="create" onSubmit={mutate} isPending={isPending} />
  );
}
