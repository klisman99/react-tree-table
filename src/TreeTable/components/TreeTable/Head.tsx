import useStore from "#tree-table/hooks/useStore";
import { TreeTableState } from "#tree-table/store";

const selector = ({ columns }: TreeTableState) => ({  columns });

export default function Head() {
    const { columns } = useStore(selector);

    return (
        <thead>
            <tr>
                {columns.map((column: any) => (
                    <th key={column.id}>{column.header}</th>
                ))}
            </tr>
        </thead>
    );
}