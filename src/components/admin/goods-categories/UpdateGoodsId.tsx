"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { GoodsCategoryForm } from "./GoodsCategoryForm";
import { type CreateOneCategoryInput } from "~/utils/validation/categories/createOneCategory";
import { type UpdateOneCategoryInput } from "~/utils/validation/categories/updateOneCategory";

export function UpdateGoodsCategory({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.categories.readOne.useQuery({ id });

  const { mutate, isPending } = api.categories.updateOne.useMutation({
    async onSuccess() {
      await apiUtils.categories.readMany.invalidate();
      router.push("/admin/categories");
    },
  });

  const handleSubmit = (
    values: CreateOneCategoryInput | UpdateOneCategoryInput
  ) => {
    mutate({
      id,
      name: values.name,
      description: values.description,
      parentId: values.parentId,
    });
  };

  return (
    <GoodsCategoryForm
      mode="update"
      initialValues={{
        id,
        name: data?.name ?? "",
        description: data?.description ?? "",
        parentId: data?.parentId ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}
