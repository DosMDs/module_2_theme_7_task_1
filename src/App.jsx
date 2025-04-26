import styles from "./App.module.css";
import { TodoForm, TodoList } from "./components";
import { useTodos } from "./context";

function App() {
	const { loading, error } = useTodos();

	if (loading) {
		return <div className={styles.loader} />;
	}

	return (
		<div className={styles.todoContainer}>
			<TodoForm />
			{error ? <div className={styles.error}>{error}</div> : <TodoList />}
		</div>
	);
}

export default App;
