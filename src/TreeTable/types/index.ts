import { ReactNode } from "react";

type CellContent = ReactNode | number | string;

export interface InitialColumn {
    id: string | number;
    header: CellContent;
    content: (row: Row) => CellContent;
}

export interface Column extends InitialColumn {
    id: string;
}

export interface InitialRow {
    id: string | number;
    parentId?: string | number | null | undefined;
    data: Object;
    collapsed?: boolean | undefined;
}

export interface Row extends InitialRow {
    id: string;
    parentId: string | null;
    collapsed: boolean;
    depth: number;
    hasChildren: boolean;
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