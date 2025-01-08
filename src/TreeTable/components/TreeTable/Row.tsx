import CollapsibleIcon from '../CollapsibleIcon';
import { Row } from '#types';
import { TreeTableState } from '#tree-table/store';
import useStore from '#tree-table/hooks/useStore';

interface RowProps {
    row: Row;
}

const selector = ({
    columns,
    toggleCollapse
}: TreeTableState) => ({
    columns,
    toggleCollapse
});

export default function Rowle({ row }: RowProps) {
    const { columns, toggleCollapse } = useStore(selector);

    return (
        <tr>
            {columns.map((column, key) => (
                <td key={column.id}>
                    {key === 0
                        ? (
                            <div style={{ paddingLeft: (row.depth * 25) + "px" }} className='tree-grid__identification-column'>
                                {row.hasChildren && (
                                    <CollapsibleIcon
                                        collapsed={row.collapsed}
                                        onClick={() => toggleCollapse(row.id)}
                                    />
                                )}
                                {column.content(row)}
                            </div>
                        )
                        : column.content(row)
                    }
                </td>
            ))}
        </tr>
    );
}