import { UpdateGoodsCategory } from "~/components/admin/goods-categories/UpdateGoodsCategory";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateGoodsCategory id={id} />;
}
