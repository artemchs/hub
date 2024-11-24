import { UpdateOneGoodsExportSchema } from "~/components/admin/goods/export/schemas/UpdateOneGoodsExportSchema";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <UpdateOneGoodsExportSchema id={id} />;
}
