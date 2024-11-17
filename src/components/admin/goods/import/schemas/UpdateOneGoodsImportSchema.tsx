"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneGoodsImportSchemaInput } from "~/utils/validation/goods/import/schemas/createOneGoodsImportSchema";
import { type UpdateOneGoodsImportSchemaInput } from "~/utils/validation/goods/import/schemas/updateOneGoodsImportSchema";
import { SingleGoodsImportSchemaForm } from "./SingleGoodsImportSchemaForm";
import { parseGoodsImportSchema } from "~/utils/validation/goods/import/schemas/parseGoodsImportSchema";

export function UpdateOneGoodsImportSchema({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.goods.import.schemas.readOne.useQuery({
    id,
  });

  const { mutate, isPending } = api.goods.import.schemas.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.goods.import.schemas.readMany.invalidate(),
        apiUtils.goods.import.schemas.readOne.invalidate({ id }),
      ]);
      router.push("/admin/goods/import/schemas");
    },
  });

  const handleSubmit = (
    values: CreateOneGoodsImportSchemaInput | UpdateOneGoodsImportSchemaInput
  ) => {
    mutate({
      ...values,
      id,
    });
  };

  return (
    <SingleGoodsImportSchemaForm
      mode="update"
      initialValues={{
        id,
        name: data?.name ?? "",
        schema: data?.schema ? parseGoodsImportSchema(data) : {},
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}
