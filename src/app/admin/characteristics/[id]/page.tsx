import { UpdateOneGoodsCharacteristic } from "~/components/admin/goods-characteristics/UpdateOneGoodsCharacteristic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsCharacteristic id={id} />;
}
