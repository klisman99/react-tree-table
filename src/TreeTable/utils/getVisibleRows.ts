import { Row } from "#types";

export default function getVisibleRows(rows: Row[]) {
	const hiddenRows: string[] = [];

	rows.forEach((r) => r.collapsed && hiddenRows.push(...r.children));

	return rows.filter((r) => !hiddenRows.includes(r.id));
}
