import { Prisma } from "@prisma/client";

export type ExportGoods = Prisma.GoodGetPayload<{
  include: {
    category: {
      select: { name: true };
    };
    mediaToGood: {
      include: {
        media: {
          select: { key: true };
        };
      };
    };
    attributeToGood: {
      include: {
        attribute: {
          select: { name: true };
        };
        value: {
          select: { value: true };
        };
      };
    };
    characteristicToGood: {
      include: {
        characteristic: {
          select: { name: true };
        };
        values: {
          select: { value: true };
        };
      };
    };
  };
}>[];
