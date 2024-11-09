"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneCharacteristicInput } from "~/utils/validation/characteristics/createOneCharacteristic";
import { type UpdateOneCharacteristicInput } from "~/utils/validation/characteristics/updateOneCharacteristic";
import { SingleGoodsCharacteristicForm } from "./SingleGoodsCharacteristicForm";

export function UpdateOneGoodsCharacteristic({ id }: { id: string }) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { data, isFetching } = api.characteristics.readOne.useQuery({ id });

  const { mutate, isPending } = api.characteristics.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.characteristics.readMany.invalidate(),
        apiUtils.characteristics.readOne.invalidate({ id }),
      ]);
      router.push("/admin/characteristics");
    },
  });

  const handleSubmit = (
    values: CreateOneCharacteristicInput | UpdateOneCharacteristicInput
  ) => {
    mutate({
      id,
      name: values.name,
    });
  };

  return (
    <SingleGoodsCharacteristicForm
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
