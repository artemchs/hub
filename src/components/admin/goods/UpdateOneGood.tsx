"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneGoodInput } from "~/utils/validation/goods/createOneGood";
import { type UpdateOneGoodInput } from "~/utils/validation/goods/updateOneGood";
import { SingleGoodForm } from "./SingleGoodForm";
import Decimal from "decimal.js";

export function UpdateOneGood({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.goods.readOne.useQuery({
    id,
  });

  const { mutate, isPending } = api.goods.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.goods.readMany.invalidate(),
        apiUtils.goods.readOne.invalidate({ id }),
      ]);
      router.push("/admin/goods");
    },
  });

  const handleSubmit = (values: CreateOneGoodInput | UpdateOneGoodInput) => {
    mutate({
      ...values,
      id,
    });
  };

  return (
    <SingleGoodForm
      mode="update"
      initialValues={{
        id,
        name: data?.name ?? "",
        description: data?.description ?? "",
        sku: data?.sku ?? "",
        fullPrice: data?.fullPrice ? new Decimal(data.fullPrice).toNumber() : 0,
        price: data?.price ? new Decimal(data.price).toNumber() : 0,
        quantity: data?.quantity ? new Decimal(data.quantity).toNumber() : 0,
        categoryId: data?.categoryId ?? undefined,
        attributes:
          data?.attributeToGood.map((v) => ({
            id: v.attributeId,
            valueId: v.valueId,
          })) ?? [],
        characteristics:
          data?.characteristicToGood.map((v) => ({
            id: v.characteristicId,
            valueIds: v.values.map((v) => v.id),
          })) ?? [],
        internalFields:
          data?.internalFieldToGood
            .filter((v) => v.fieldId !== null)
            .map((v) => ({
              id: v.fieldId as string,
              valueIds: v.values.map((v) => v.id),
            })) ?? [],
        idValueIds: data?.idValues.map((v) => v.id) ?? [],
        tagIds: data?.tags.map((v) => v.id) ?? [],
        mediaKeys: data?.mediaToGood.map((v) => v.media.key) ?? [],
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
    />
  );
}
