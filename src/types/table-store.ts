import type {
    MRT_ColumnFiltersState,
    MRT_ColumnOrderState,
    MRT_ColumnPinningState,
    MRT_ColumnSizingInfoState,
    MRT_ColumnSizingState,
    MRT_DensityState,
    MRT_FilterOption,
    MRT_RowSelectionState,
    MRT_SortingState,
    MRT_VisibilityState,
} from "mantine-react-table";
import { type StoreApi } from "zustand";

export interface TableState {
    columnFilters: MRT_ColumnFiltersState;
    columnFilterFns: Record<string, MRT_FilterOption>;
    columnVisibility: MRT_VisibilityState;
    columnPinning: MRT_ColumnPinningState;
    columnOrder: MRT_ColumnOrderState;
    columnSizing: MRT_ColumnSizingState;
    columnSizingInfo: MRT_ColumnSizingInfoState;
    density: MRT_DensityState;
    globalFilter: string | undefined;
    showGlobalFilter: boolean;
    showColumnFilters: boolean;
    sorting: MRT_SortingState;
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
    rowSelection: MRT_RowSelectionState;
}

export interface TableActions {
    setColumnFilterFns: (
        updaterOrValue:
            | Record<string, MRT_FilterOption>
            | ((
                  prev: Record<string, MRT_FilterOption>
              ) => Record<string, MRT_FilterOption>)
    ) => void;
    setColumnFilters: (
        updaterOrValue:
            | MRT_ColumnFiltersState
            | ((prev: MRT_ColumnFiltersState) => MRT_ColumnFiltersState)
    ) => void;
    setColumnVisibility: (
        updaterOrValue:
            | MRT_VisibilityState
            | ((prev: MRT_VisibilityState) => MRT_VisibilityState)
    ) => void;
    setColumnPinning: (
        updaterOrValue:
            | MRT_ColumnPinningState
            | ((prev: MRT_ColumnPinningState) => MRT_ColumnPinningState)
    ) => void;
    setColumnOrder: (
        updaterOrValue:
            | MRT_ColumnOrderState
            | ((prev: MRT_ColumnOrderState) => MRT_ColumnOrderState)
    ) => void;
    setColumnSizing: (
        updaterOrValue:
            | MRT_ColumnSizingState
            | ((prev: MRT_ColumnSizingState) => MRT_ColumnSizingState)
    ) => void;
    setColumnSizingInfo: (
        updaterOrValue:
            | MRT_ColumnSizingInfoState
            | ((prev: MRT_ColumnSizingInfoState) => MRT_ColumnSizingInfoState)
    ) => void;
    setDensity: (
        updaterOrValue:
            | MRT_DensityState
            | ((prev: MRT_DensityState) => MRT_DensityState)
    ) => void;
    setShowColumnFilters: (
        updaterOrValue: boolean | ((prev: boolean) => boolean)
    ) => void;
    setShowGlobalFilter: (
        updaterOrValue: boolean | ((prev: boolean) => boolean)
    ) => void;
    setSorting: (
        updaterOrValue:
            | MRT_SortingState
            | ((prev: MRT_SortingState) => MRT_SortingState)
    ) => void;
    setGlobalFilter: (
        updaterOrValue:
            | string
            | undefined
            | ((prev: string | undefined) => string | undefined)
    ) => void;
    setPagination: (
        updaterOrValue:
            | { pageIndex: number; pageSize: number }
            | ((prev: { pageIndex: number; pageSize: number }) => {
                  pageIndex: number;
                  pageSize: number;
              })
    ) => void;
    resetState: () => void;
    setRowSelection: (
        updaterOrValue:
            | MRT_RowSelectionState
            | ((prev: MRT_RowSelectionState) => MRT_RowSelectionState)
    ) => void;
}

export type TableStore = TableState & TableActions;

export type TableStoreApi = StoreApi<TableStore>;
