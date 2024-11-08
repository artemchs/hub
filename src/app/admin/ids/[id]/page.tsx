import { UpdateGoodsId } from "~/components/admin/goods-ids/UpdateGoodsId";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateGoodsId id={id} />;
}
