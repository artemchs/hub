import type {
  MRT_ColumnDef,
  MRT_FilterOption,
  MRT_RowData,
} from "mantine-react-table";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TableState, TableActions } from "~/types/table-store";

// const deserializeDates = (obj: unknown): unknown => {
//   if (Array.isArray(obj)) {
//     return obj.map(deserializeDates);
//   }
//   if (obj !== null && typeof obj === "object") {
//     const newObj: Record<string, unknown> = {};
//     for (const [key, value] of Object.entries(obj)) {
//       if (Array.isArray(value)) {
//         newObj[key] = value.map((v: string) =>
//           typeof v === "string" && !isNaN(Date.parse(v)) ? new Date(v) : v
//         );
//       } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
//         const columnDef = key.split("_")[0];
//         if (columnDef?.includes("date")) {
//           try {
//             const date = new Date(value);
//             if (date instanceof Date && !isNaN(date.getTime())) {
//               newObj[key] = date;
//             }
//           } catch (e) {
//             console.warn("Failed to parse date:", value);
//             console.error(e);
//             newObj[key] = value;
//           }
//         } else {
//           newObj[key] = value;
//         }
//       } else {
//         newObj[key] = deserializeDates(value);
//       }
//     }
//     return newObj;
//   }
//   return obj;
// };

const getDefaultFilterFn = (filterVariant?: string): MRT_FilterOption => {
  switch (filterVariant) {
    case "date-range":
      return "betweenInclusive";
    default:
      return "contains";
  }
};

const getInitialFilterFns = <TData extends MRT_RowData>(
  columns: MRT_ColumnDef<TData>[]
) => {
  return columns.reduce(
    (acc, column) => ({
      ...acc,
      [column.id as string]: getDefaultFilterFn(column.filterVariant),
    }),
    {}
  );
};

const initialState: TableState = {
  columnFilters: [],
  columnFilterFns: {},
  columnVisibility: {},
  columnPinning: {},
  columnOrder: [],
  columnSizing: {},
  columnSizingInfo: {
    columnSizingStart: [],
    deltaOffset: 0,
    deltaPercentage: 0,
    isResizingColumn: false,
    startOffset: 0,
    startSize: 0,
  },
  density: "md",
  globalFilter: undefined,
  showGlobalFilter: false,
  showColumnFilters: false,
  sorting: [],
  pagination: {
    pageIndex: 0,
    pageSize: 20,
  },
};

export const createTableStore = <TData extends MRT_RowData>(
  tableId: string,
  columns: MRT_ColumnDef<TData>[]
) => {
  const state = {
    ...initialState,
    columnFilterFns: getInitialFilterFns(columns),
  };

  return create<TableState & TableActions>()(
    persist(
      (set, get) => ({
        ...state,
        setColumnFilterFns: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? {
                  columnFilterFns: updaterOrValue(get().columnFilterFns),
                }
              : { columnFilterFns: updaterOrValue }
          ),
        setColumnFilters: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { columnFilters: updaterOrValue(get().columnFilters) }
              : { columnFilters: updaterOrValue }
          ),
        setColumnVisibility: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { columnVisibility: updaterOrValue(get().columnVisibility) }
              : { columnVisibility: updaterOrValue }
          ),
        setColumnPinning: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { columnPinning: updaterOrValue(get().columnPinning) }
              : { columnPinning: updaterOrValue }
          ),
        setColumnOrder: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { columnOrder: updaterOrValue(get().columnOrder) }
              : { columnOrder: updaterOrValue }
          ),
        setColumnSizing: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { columnSizing: updaterOrValue(get().columnSizing) }
              : { columnSizing: updaterOrValue }
          ),
        setColumnSizingInfo: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { columnSizingInfo: updaterOrValue(get().columnSizingInfo) }
              : { columnSizingInfo: updaterOrValue }
          ),
        setDensity: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { density: updaterOrValue(get().density) }
              : { density: updaterOrValue }
          ),
        setGlobalFilter: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { globalFilter: updaterOrValue(get().globalFilter) }
              : { globalFilter: updaterOrValue }
          ),
        setShowGlobalFilter: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { showGlobalFilter: updaterOrValue(get().showGlobalFilter) }
              : { showGlobalFilter: updaterOrValue }
          ),
        setShowColumnFilters: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { showColumnFilters: updaterOrValue(get().showColumnFilters) }
              : { showColumnFilters: updaterOrValue }
          ),
        setSorting: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { sorting: updaterOrValue(get().sorting) }
              : { sorting: updaterOrValue }
          ),
        setPagination: (updaterOrValue) =>
          set(
            typeof updaterOrValue === "function"
              ? { pagination: updaterOrValue(get().pagination) }
              : { pagination: updaterOrValue }
          ),
        resetState: () => set(initialState),
      }),
      {
        name: `table-${tableId}`,
        storage: createJSONStorage(() => localStorage),
      }
      // {
      //   name: `table-${tableId}`,
      //   storage: {
      //     getItem: (
      //       name
      //     ): StorageValue<{
      //       state: TableState;
      //       actions: TableActions;
      //     }> | null => {
      //       const str = localStorage.getItem(name);
      //       if (!str) return null;
      //       const parsed = JSON.parse(str) as StorageValue<{
      //         state: TableState;
      //         actions: TableActions;
      //       }>;

      //       if (parsed.state?.state.columnFilters) {
      //         parsed.state.state.columnFilters = deserializeDates(
      //           parsed.state.state.columnFilters
      //         ) as MRT_ColumnFiltersState;
      //       }

      //       return parsed;
      //     },
      //     setItem: (
      //       name,
      //       value: StorageValue<{ state: TableState; actions: TableActions }>
      //     ) => {
      //       localStorage.setItem(name, JSON.stringify(value));
      //     },
      //     removeItem: (name) => {
      //       localStorage.removeItem(name);
      //     },
      //   },
      // }
    )
  );
};
