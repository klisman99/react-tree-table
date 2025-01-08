import { ROWS } from './rows';
import { TreeTable } from './TreeTable';

function App() {
	return (
		<div style={{ margin: "100px 0 0 100px", height: "500px", width: "100%" }}>
			<TreeTable
				initialColumns={[
					{
						id: "name",
						header: "Nome",
						content: ({ data }: { data: any }) => data.name
					},
					{
						id: "value",
						header: "Valor",
						content: ({ data }: { data: any }) => data.value
					}
				]}
				initialRows={ROWS}
			/>
		</div>
	);
}

export default App;
