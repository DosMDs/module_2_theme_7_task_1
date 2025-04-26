import { useTodos } from "../../hooks";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

export const TodoList = () => {
	const { todos } = useTodos();

	if (todos.length === 0) {
		// if (titleToSearch) {
		// 	return (
		// 		<h1>{`Задач с наименованием содержащем "${titleToSearch}". Не найдено.`}</h1>
		// 	);
		// }
		return <h1>Задач пока нет.</h1>;
	}

	return (
		<ul className={styles.todoList}>
			{todos.map((todo) => {
				return <TodoItem key={todo.id} {...todo} />;
			})}
		</ul>
	);
};
