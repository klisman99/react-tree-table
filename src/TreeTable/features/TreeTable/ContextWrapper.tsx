import TreeTableProvider from "#tree-table/components/TreeTableProvider";
import TreeTableContext from "#tree-table/contexts/TreeTableContext";
import { Fragment, ReactElement, ReactNode, useContext } from "react";

export default function ContextWrapper({ children }: { children: ReactNode | ReactElement }) {
    const isWrapped = useContext(TreeTableContext);

    if (!isWrapped) {
        return (
            <TreeTableProvider>
                {children}
            </TreeTableProvider>
        );
    }

    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return <Fragment children={children} />;
}