import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { categoriesRouter } from "./routers/categories/categoriesRouter";
import { goodsRouter } from "./routers/goods/goodsRouter";
import { idsRouter } from "./routers/ids/idsRouter";
import { attributesRouter } from "./routers/attributes/attributesRouter";
import { characteristicsRouter } from "./routers/characteristics/characteristicsRouter";
import { tagsRouter } from "./routers/tags/tagsRouter";
import { mediaRouter } from "./routers/media/mediaRouter";
import { internalFieldsRouter } from "./routers/internal-fields/internalFieldsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  goods: goodsRouter,
  ids: idsRouter,
  attributes: attributesRouter,
  characteristics: characteristicsRouter,
  tags: tagsRouter,
  internalFields: internalFieldsRouter,
  media: mediaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
