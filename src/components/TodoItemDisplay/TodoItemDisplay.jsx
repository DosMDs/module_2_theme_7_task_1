import { useDeleteTodo, useUpdateTodo } from "../../hooks";
import { IconButton } from "../IconButton/IconButton";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import styles from "./TodoItemDisplay.module.css";

export const TodoItemDisplay = ({
	id,
	title,
	completed,
	refreshTodosList,
	setIsEdit,
}) => {
	const { isUpdating, updateTodo } = useUpdateTodo(refreshTodosList);
	const { isDeleting, deleteTodo } = useDeleteTodo(refreshTodosList);

	const handleCheckboxUpdate = (id) => {
		const body = { completed: !completed, title };
		updateTodo(id, body);
	};

	return (
		<>
			<input
				type="checkbox"
				checked={completed}
				className={styles.checkbox}
				disabled={isUpdating}
				onChange={() => handleCheckboxUpdate(id)}
			/>
			<span className={styles.title}>{title}</span>
			<IconButton
				src={editIcon}
				alt="Изменить"
				handleOnClick={() => setIsEdit(true)}
			/>
			<IconButton
				src={deleteIcon}
				alt="Удалить"
				disabled={isDeleting}
				handleOnClick={() => deleteTodo(id)}
			/>
		</>
	);
};
