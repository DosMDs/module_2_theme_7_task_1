import { useState } from "react";
import { TodoForm, TodoList } from "./components";
import { useGetTodos } from "./hooks";
import styles from "./App.module.css";

function App() {
	const [titleToSearch, setTitleToSearch] = useState("");
	const [error, setError] = useState(null);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodosList = (result) => {
		setError(result.error);
		setRefreshTodosFlag(!refreshTodosFlag);
	};

	const { todos, isLoading, sortOrder, changeSortOrder } = useGetTodos(
		titleToSearch,
		refreshTodosFlag,
		setError
	);

	return (
		<div className={styles.todoContainer}>
			<TodoForm
				setTitleToSearch={setTitleToSearch}
				refreshTodosList={refreshTodosList}
				sortOrder={sortOrder}
				changeSortOrder={changeSortOrder}
			/>
			{error ? (
				<h1>{error}</h1>
			) : isLoading ? (
				<div className={styles.loader} />
			) : (
				<TodoList
					todos={todos}
					titleToSearch={titleToSearch}
					refreshTodosList={refreshTodosList}
				/>
			)}
		</div>
	);
}

export default App;
