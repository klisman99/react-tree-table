import { useContext } from "react";
import TreeTableContext from "../contexts/TreeTableContext";
import { TreeTableState } from "../store";
import { useStoreWithEqualityFn } from "zustand/traditional";

export default function useStore<T>(
    selector: (state: TreeTableState) => T,
    equalityFn?: (left: T, right: T) => boolean
): T {
    const store = useContext(TreeTableContext);

    if (!store) {
        throw new Error("Missing TreeTableContext.Provider in components tree");
    }

    return useStoreWithEqualityFn(store, selector, equalityFn);
}
