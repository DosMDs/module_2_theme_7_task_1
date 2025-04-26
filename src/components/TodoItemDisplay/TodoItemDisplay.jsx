import { useTodos } from "../../hooks";
import { IconButton } from "../IconButton/IconButton";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import styles from "./TodoItemDisplay.module.css";

export const TodoItemDisplay = ({ id, title, completed, setIsEdit }) => {
	const { loading, handleDelete, handleUpdate } = useTodos();

	const handleCheckboxUpdate = (id) => {
		const body = { completed: !completed, title };
		handleUpdate(id, body);
	};

	return (
		<>
			<input
				type="checkbox"
				checked={completed}
				className={styles.checkbox}
				disabled={loading}
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
				disabled={loading}
				handleOnClick={() => handleDelete(id)}
			/>
		</>
	);
};
