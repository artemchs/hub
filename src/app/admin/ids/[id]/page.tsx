import { UpdateOneGoodsId } from "./_components/UpdateOneGoodsId";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsId id={id} />;
}
