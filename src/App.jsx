import styles from "./App.module.css";
import { TodoForm, TodoList } from "./components";
import { useTodos } from "./hooks";

function App() {
	const { loading, error } = useTodos();

	return (
		<div className={styles.todoContainer}>
			<TodoForm />
			{loading ? (
				<div className={styles.loader} />
			) : error ? (
				<div className={styles.error}>{error}</div>
			) : (
				<TodoList />
			)}
		</div>
	);
}

export default App;
