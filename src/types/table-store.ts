import type {
  MRT_ColumnFiltersState,
  MRT_DensityState,
  MRT_FilterOption,
  MRT_SortingState,
  MRT_VisibilityState,
} from "mantine-react-table";
import { StoreApi } from "zustand";

export interface TableState {
  columnFilters: MRT_ColumnFiltersState;
  columnFilterFns: Record<string, MRT_FilterOption>;
  columnVisibility: MRT_VisibilityState;
  density: MRT_DensityState;
  globalFilter: string | undefined;
  showGlobalFilter: boolean;
  showColumnFilters: boolean;
  sorting: MRT_SortingState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
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
}

export type TableStore = {
  state: TableState;
  actions: TableActions;
};

export type TableStoreApi = StoreApi<TableStore>;
