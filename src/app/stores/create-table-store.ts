import type { MRT_ColumnDef, MRT_FilterOption } from "mantine-react-table";
import { create } from "zustand";
import { persist, type StorageValue } from "zustand/middleware";
import type { TableState, TableActions } from "~/types/table-store";

const deserializeDates = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(deserializeDates);
  }
  if (obj !== null && typeof obj === "object") {
    // Handle range values (for date-range filters)
    if (Array.isArray(obj.value)) {
      return {
        ...obj,
        value: obj.value.map((v: string) =>
          typeof v === "string" && !isNaN(Date.parse(v)) ? new Date(v) : v
        ),
      };
    }
    // Handle single date value
    if (typeof obj.value === "string" && !isNaN(Date.parse(obj.value))) {
      const columnDef = obj.id?.split("_")[0];
      if (columnDef?.includes("date")) {
        try {
          const date = new Date(obj.value);
          // Validate that it's a proper date object
          if (date instanceof Date && !isNaN(date.getTime())) {
            return { ...obj, value: date };
          }
        } catch (e) {
          console.warn("Failed to parse date:", obj.value);
          return obj;
        }
      }
    }
    // Recursively process object properties
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, deserializeDates(value)])
    );
  }
  return obj;
};

// Helper to get default filter function based on column type
const getDefaultFilterFn = (filterVariant?: string): MRT_FilterOption => {
  switch (filterVariant) {
    case "date-range":
      return "betweenInclusive";
    default:
      return "contains";
  }
};

// Create initial filter functions based on columns
const getInitialFilterFns = (
  columns: MRT_ColumnDef<Record<string, unknown>>[]
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

export const createTableStore = (
  tableId: string,
  columns: MRT_ColumnDef<any>[]
) => {
  const state: TableState = {
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
              ? { columnFilterFns: updaterOrValue(get().columnFilterFns) }
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
        storage: {
          getItem: (name): StorageValue<TableState & TableActions> | null => {
            const str = sessionStorage.getItem(name);
            if (!str) return null;
            const parsed = JSON.parse(str) as StorageValue<
              TableState & TableActions
            >;

            // Deserialize dates in columnFilters
            if (parsed.state?.columnFilters) {
              parsed.state.columnFilters = deserializeDates(
                parsed.state.columnFilters
              );
            }

            return parsed;
          },
          setItem: (name, value: StorageValue<TableState & TableActions>) => {
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
