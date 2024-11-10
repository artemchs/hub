import { UpdateOneGoodsMedia } from "~/components/admin/goods-media/UpdateOneGoodsMedia";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsMedia id={id} />;
}
