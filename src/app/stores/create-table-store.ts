import type {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_FilterOption,
  MRT_RowData,
} from "mantine-react-table";
import { create } from "zustand";
import { persist, type StorageValue } from "zustand/middleware";
import type { TableState, TableActions } from "~/types/table-store";

const deserializeDates = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    return obj.map(deserializeDates);
  }
  if (obj !== null && typeof obj === "object") {
    const newObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        newObj[key] = value.map((v: string) =>
          typeof v === "string" && !isNaN(Date.parse(v)) ? new Date(v) : v
        );
      } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
        const columnDef = key.split("_")[0];
        if (columnDef?.includes("date")) {
          try {
            const date = new Date(value);
            if (date instanceof Date && !isNaN(date.getTime())) {
              newObj[key] = date;
            }
          } catch (e) {
            console.warn("Failed to parse date:", value);
            console.error(e);
            newObj[key] = value;
          }
        } else {
          newObj[key] = value;
        }
      } else {
        newObj[key] = deserializeDates(value);
      }
    }
    return newObj;
  }
  return obj;
};

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
  const state: TableState = {
    ...initialState,
    columnFilterFns: getInitialFilterFns(columns),
  };

  return create<{ state: TableState; actions: TableActions }>()(
    persist(
      (set, _get) => ({
        state,
        actions: {
          setColumnFilterFns: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                columnFilterFns:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.columnFilterFns)
                    : updaterOrValue,
              },
            })),
          setColumnFilters: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                columnFilters:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.columnFilters)
                    : updaterOrValue,
              },
            })),
          setColumnVisibility: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                columnVisibility:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.columnVisibility)
                    : updaterOrValue,
              },
            })),
          setDensity: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                density:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.density)
                    : updaterOrValue,
              },
            })),
          setGlobalFilter: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                globalFilter:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.globalFilter)
                    : updaterOrValue,
              },
            })),
          setShowGlobalFilter: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                showGlobalFilter:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.showGlobalFilter)
                    : updaterOrValue,
              },
            })),
          setShowColumnFilters: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                showColumnFilters:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.showColumnFilters)
                    : updaterOrValue,
              },
            })),
          setSorting: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                sorting:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.sorting)
                    : updaterOrValue,
              },
            })),
          setPagination: (updaterOrValue) =>
            set((state) => ({
              state: {
                ...state.state,
                pagination:
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(state.state.pagination)
                    : updaterOrValue,
              },
            })),
          resetState: () => set({ state: initialState }),
        },
      }),
      {
        name: `table-${tableId}`,
        storage: {
          getItem: (
            name
          ): StorageValue<{
            state: TableState;
            actions: TableActions;
          }> | null => {
            const str = sessionStorage.getItem(name);
            if (!str) return null;
            const parsed = JSON.parse(str) as StorageValue<{
              state: TableState;
              actions: TableActions;
            }>;

            if (parsed.state?.state.columnFilters) {
              parsed.state.state.columnFilters = deserializeDates(
                parsed.state.state.columnFilters
              ) as MRT_ColumnFiltersState;
            }

            return parsed;
          },
          setItem: (
            name,
            value: StorageValue<{ state: TableState; actions: TableActions }>
          ) => {
            sessionStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => {
            sessionStorage.removeItem(name);
          },
        },
      }
    )
  );
};
