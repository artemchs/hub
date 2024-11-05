"use client";

import { api } from "~/trpc/react";
import { UpdateOneGoodsIdForm } from "./UpdateOneGoodsIdForm";

export function UpdateOneGoodsId({ id }: { id: string }) {
  const { data, isLoading } = api.ids.readOne.useQuery({ id });

  return <UpdateOneGoodsIdForm data={data} />;
}
