import { UpdateOneGoodsImportSchema } from "~/components/admin/goods/import/schemas/UpdateOneGoodsImportSchema";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsImportSchema id={id} />;
}
