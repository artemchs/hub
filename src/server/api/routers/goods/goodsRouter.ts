import { createTRPCRouter } from "../../trpc";
import { goodsImportRouter } from "./import/goodsImportRouter";

export const goodsRouter = createTRPCRouter({
  import: goodsImportRouter,
});
