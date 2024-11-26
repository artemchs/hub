import { UpdateOneGoodsTag } from "~/components/admin/goods-tags/UpdateOneGoodsTag";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsTag id={id} />;
}
