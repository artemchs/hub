"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/createOneGoodsExportSchema";
import { type UpdateOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/updateOneGoodsExportSchema";
import { SingleGoodsExportSchemaForm } from "./SingleGoodsExportSchemaForm";

export function UpdateOneGoodsExportSchema({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.goods.export.schemas.readOne.useQuery({
    id,
  });

  const { mutate, isPending } = api.goods.export.schemas.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.goods.export.schemas.readMany.invalidate(),
        apiUtils.goods.export.schemas.readOne.invalidate({ id }),
      ]);
      router.push("/admin/goods/export/schemas");
    },
  });

  const handleSubmit = (
    values: CreateOneGoodsExportSchemaInput | UpdateOneGoodsExportSchemaInput
  ) => {
    mutate({
      ...values,
      id,
    });
  };

  return (
    <SingleGoodsExportSchemaForm
      mode="update"
      initialValues={{
        id,
        name: data?.name ?? "",
        identifierIds:
          data?.identifiers.map(({ identifierId }) => identifierId) ?? [],
        template: data?.template ?? "XML_ROZETKA",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}
