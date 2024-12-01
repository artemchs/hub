import { UpdateOneGoodsInternalField } from "~/components/admin/goods-internal-fields/UpdateOneGoodsInternalField";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsInternalField id={id} />;
}
