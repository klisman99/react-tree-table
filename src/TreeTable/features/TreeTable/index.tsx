import ContextWrapper from './ContextWrapper';
import TreeTable, { TreeTableProps } from '../../components/TreeTable';

export default function TreeTableContainer({
	initialColumns,
	initialRows
}: TreeTableProps) {
	return (
		<ContextWrapper>
			<TreeTable
				initialColumns={initialColumns}
				initialRows={initialRows}
			/>
		</ContextWrapper>
	);
}
