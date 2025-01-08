import TreeTableContext from "#tree-table/contexts/TreeTableContext";
import { createStore, TreeTableStore } from "#tree-table/store";
import { PropsWithChildren, useRef } from "react";

export default function TreeTableProvider({ children }: PropsWithChildren) {
    const store = useRef<TreeTableStore>();

    if (!store.current) {
        store.current = createStore();
    }

    return (
        <TreeTableContext.Provider value={store.current}>
            {children}
        </TreeTableContext.Provider>
    );
}
