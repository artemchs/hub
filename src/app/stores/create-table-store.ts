import type {
    MRT_ColumnDef,
    MRT_FilterOption,
    MRT_RowData,
} from "mantine-react-table";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TableState, TableActions } from "~/types/table-store";

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
    rowSelection: {},
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
                                  columnFilterFns: updaterOrValue(
                                      get().columnFilterFns
                                  ),
                              }
                            : { columnFilterFns: updaterOrValue }
                    ),
                setColumnFilters: (updaterOrValue) =>
                    set(
                        typeof updaterOrValue === "function"
                            ? {
                                  columnFilters: updaterOrValue(
                                      get().columnFilters
                                  ),
                              }
                            : { columnFilters: updaterOrValue }
                    ),
                setColumnVisibility: (updaterOrValue) =>
                    set(
                        typeof updaterOrValue === "function"
                            ? {
                                  columnVisibility: updaterOrValue(
                                      get().columnVisibility
                                  ),
                              }
                            : { columnVisibility: updaterOrValue }
                    ),
                setColumnPinning: (updaterOrValue) =>
                    set(
                        typeof updaterOrValue === "function"
                            ? {
                                  columnPinning: updaterOrValue(
                                      get().columnPinning
                                  ),
                              }
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
                            ? {
                                  columnSizing: updaterOrValue(
                                      get().columnSizing
                                  ),
                              }
                            : { columnSizing: updaterOrValue }
                    ),
                setColumnSizingInfo: (updaterOrValue) =>
                    set(
                        typeof updaterOrValue === "function"
                            ? {
                                  columnSizingInfo: updaterOrValue(
                                      get().columnSizingInfo
                                  ),
                              }
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
                            ? {
                                  globalFilter: updaterOrValue(
                                      get().globalFilter
                                  ),
                              }
                            : { globalFilter: updaterOrValue }
                    ),
                setShowGlobalFilter: (updaterOrValue) =>
                    set(
                        typeof updaterOrValue === "function"
                            ? {
                                  showGlobalFilter: updaterOrValue(
                                      get().showGlobalFilter
                                  ),
                              }
                            : { showGlobalFilter: updaterOrValue }
                    ),
                setShowColumnFilters: (updaterOrValue) =>
                    set(
                        typeof updaterOrValue === "function"
                            ? {
                                  showColumnFilters: updaterOrValue(
                                      get().showColumnFilters
                                  ),
                              }
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
                setRowSelection: (updaterOrValue) =>
                    set(
                        typeof updaterOrValue === "function"
                            ? {
                                  rowSelection: updaterOrValue(
                                      get().rowSelection
                                  ),
                              }
                            : { rowSelection: updaterOrValue }
                    ),
            }),
            {
                name: `table-${tableId}`,
                storage: createJSONStorage(() => localStorage),
            }
        )
    );
};
