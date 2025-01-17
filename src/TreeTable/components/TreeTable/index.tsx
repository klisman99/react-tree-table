import { useEffect, useRef } from 'react';

import { Column, InitialColumn, InitialRow } from '#types';
import useStore from '#tree-table/hooks/useStore';
import initializeRows from '#tree-table/utils/rowsInitializer';
import { TreeTableState } from '#tree-table/store';
import ColGroup from './ColGroup';
import Head from './Head';
import useVirtualizer from '#tree-table/hooks/useVirtualizer';
import getVisibleRows from '#tree-table/utils/getVisibleRows';
import Row from './Row';

const DEFAULT_LINE_HEIGHT = 35;

export interface TreeTableProps {
	initialColumns: InitialColumn[];
	initialRows: InitialRow[];
	headerHeight?: number;
	rowHeight?: number;
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
	initialRows,
	headerHeight = DEFAULT_LINE_HEIGHT,
	rowHeight = DEFAULT_LINE_HEIGHT
}: TreeTableProps) {
	const {
		rows,
		setColumns,
		setRows
	} = useStore(selector);
	const visibleRows = getVisibleRows(rows);

	useEffect(() => {
		setColumns(initialColumns.map((c) => c as Column));
		setRows(initializeRows(initialRows));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const containerRef = useRef<HTMLDivElement>(null);
	// Memo is preventing visibleRows update when collapses
	// const visibleRows = useMemo(() => getVisibleRows(rows), [rows]);

	const virtualizer = useVirtualizer({
		size: 35,
		count: rows.length,
		containerRef: containerRef
	});

	return (
		<div className='relative overflow-hidden h-full'>
			<div ref={containerRef} className='overflow-auto h-full w-full'>
				<div className='absolute'>
					<table>
						<ColGroup />
						<Head />
						<tbody>
							{virtualizer.range.map(
								(i) => <Row key={i} row={visibleRows[i]} />
							)}
						</tbody>
					</table>
				</div>
				<div
					className='relative'
					style={{ height: virtualizer.totalSize + headerHeight + "px" }}
				/>
			</div>
		</div>
	);
}