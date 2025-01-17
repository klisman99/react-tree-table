import { ReactNode } from "react";

type CellContent = ReactNode | number | string;

export interface InitialColumn {
    id: string | number;
    header: CellContent;
    content: (row: Row) => CellContent;
    size?: number | "auto";
}

export interface Column extends InitialColumn {
    id: string;
}

export interface InitialRow {
    id: string | number;
    parentId?: string | number | null | undefined;
    data: Object | null | undefined;
    collapsed?: boolean | undefined;
}

export interface Row extends InitialRow {
    id: string;
    parentId: string | null;
    collapsed?: boolean;
    depth: number;
    children: string[];
}

export interface TreeModel {
    getColumns: () => Column[];
    getRows: () => Row[];
    getVisibleColumns: () => Column[];
    getVisibleRows: () => Row[];
}

export interface TreeGridContext {
    getTreeModel: () => TreeModel;
}