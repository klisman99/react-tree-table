import { Column, Row } from "#types";
import { create } from "zustand";

export interface TreeTableState {
    columns: Column[];
    rows: Row[];
    setColumns: (columns: Column[]) => void;
    setRows: (columns: Row[]) => void;
    toggleCollapse: (rowId: string) => void;
}

export type TreeTableStore = ReturnType<typeof createStore>;

export const createStore = () => create<TreeTableState>(
    (set, get) => ({
        columns: [],
        rows: [],
        setColumns(columns: Column[]) {
            set({ columns });
        },
        setRows(rows: Row[]) {
            set({ rows });
        },
        toggleCollapse(rowId) {
            const { rows } = get();
            const row = rows.find((r) => r.id === rowId)!;

            row.collapsed = !row.collapsed;

            set({ rows });
        }
    })
);
