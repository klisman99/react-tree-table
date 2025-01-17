import { InitialRow, Row } from "#types";

export default function initializeRows(rows: InitialRow[]) {
    const existingIds: string[] = [];
    const initialized = new Map<string, Row>(
        rows.map(
            (r) => {
                if (existingIds.some((id) => id === r.id)) {
                    throw new Error(`Found a row with repeated id: [${r.id}]`);
                }
    
                const rowId = r.id.toString();
    
                existingIds.push(rowId);
    
                const row = {
                    ...r,
                    id: rowId,
                    parentId: r.parentId?.toString() || null,
                    collapsed: r.collapsed || false,
                    children: [] as string[]
                } as Row;
    
                if (r.parentId) {
                    row.collapsed = r.collapsed || false;
                }
    
                return [row.id, row];
            }
        )
    );

    function getDepth(row: Row) {
        if (row.parentId === null) {
            return 0;
        }

        let depth = 1;
        let parentId = row.parentId;

        while (true) {
            const parentRow = initialized.get(parentId)!;

            if (parentRow.parentId === null) {
                return depth;
            }

            parentId = parentRow.parentId;
            depth++;
        }
    }

    initialized.forEach(
        (r) => {
            if (r.parentId) {
                initialized.get(r.parentId)?.children.push(r.id);
            }

            initialized.set(r.id, {
                ...r,
                depth: getDepth(r)
            });
        }
    );

    return Array.from(initialized.values());
}
