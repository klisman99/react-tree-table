import useStore from "#tree-table/hooks/useStore";
import { TreeTableState } from "#tree-table/store";

const selector = ({ columns }: TreeTableState) => ({  columns });

export default function ColGroup() {
    const { columns } = useStore(selector);

    return (
        <colgroup>
            {columns.map((c) => (
                <col key={c.id} style={{ width: `${c.size}px` }} />
            ))}
        </colgroup>
    );
}