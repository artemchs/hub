import { UpdateOneGoodsAttribute } from "~/components/admin/goods-attributes/UpdateOneGoodsAttribute";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsAttribute id={id} />;
}
