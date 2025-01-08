import { InitialRow, Row } from "#types";

export default function initializeRows(rows: InitialRow[]) {
    const existingIds: string[] = [];
    const parentRows: { [id: string]: number } = {};
    const initialized = rows.map(
		(r) => {
            if (existingIds.some((id) => id === r.id)) {
                throw new Error(`Found a row with repeated id: [${r.id}]`);
            }

            const rowId = r.id.toString();

            existingIds.push(rowId);

            if (r.parentId) {
                parentRows[r.parentId] = -1;
            }

            return ({
                ...r,
                id: rowId,
                parentId: r.parentId || null,
                collapsed: r.collapsed || false
            }) as Row;
        }
	);

    for (let key in parentRows) {
        parentRows[key] = initialized.findIndex((r) => r.id === key);
    }

    function getDepth(row: Row) {
        if (row.parentId === null) {
            return 0;
        }

        let depth = 1;
        let parentId = row.parentId;

        while (true) {
            const parentRow = initialized[parentRows[parentId]];

            if (parentRow.parentId === null) {
                return depth;
            }

            parentId = parentRow.parentId;
            depth++;
        }
    }

    return initialized.map(
        (r) => ({
            ...r,
            depth: getDepth(r),
            hasChildren: !!parentRows[r.id]
        })
    );
}
