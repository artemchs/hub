import { UpdateOneGood } from "~/components/admin/goods/UpdateOneGood";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGood id={id} />;
}
