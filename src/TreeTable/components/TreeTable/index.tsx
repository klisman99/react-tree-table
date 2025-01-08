import React, { useEffect, useRef } from 'react';

import useVirtualizer from '../../hooks/useVirtualizer';
import Row from './Row';
import { Column, InitialColumn, InitialRow } from '#types';
import useStore from '#tree-table/hooks/useStore';
import initializeRows from '#tree-table/utils/rowsInitializer';
import { TreeTableState } from '#tree-table/store';

export interface TreeTableProps {
	initialColumns: InitialColumn[];
	initialRows: InitialRow[];
}

const selector = ({
	columns,
	rows,
	setColumns,
	setRows
}: TreeTableState) => ({
	columns,
	rows,
	setColumns,
	setRows
});

export default function TreeTable({
	initialColumns,
	initialRows
}: TreeTableProps) {
	const {
		columns,
		rows,
		setColumns,
		setRows
	} = useStore(selector);

	useEffect(() => {
		setColumns(initialColumns.map((c) => c as Column));
		setRows(initializeRows(initialRows));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const containerRef = useRef<HTMLDivElement>(null);

	// const virtualizer = useVirtualizer({
	// 	size: 35,
	// 	count: rows.length,
	// 	containerRef: containerRef
	// });

	// console.log(virtualizer.getRows());

	return (
		<div ref={containerRef} className='overflow-auto h-full w-full'>
			<table>
				<colgroup>
					{columns.map((_: any, key: number) => (
						<col key={key} />
					))}
				</colgroup>
				<thead>
					<tr>
						{columns.map((column: any) => (
							<th key={column.id}>{column.header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => <Row key={row.id} row={row} />)}
				</tbody>
			</table>
		</div>
	);
}