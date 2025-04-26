import { useState, useRef, useEffect } from "react";
import approveIcon from "../../assets/approve.svg";
import cancelIcon from "../../assets/cancel.svg";
import { useUpdateTodo } from "../../hooks";
import { IconButton } from "../IconButton/IconButton";
import styles from "./TodoItemEdit.module.css";

export const TodoItemEdit = ({
	id,
	title,
	completed,
	refreshTodosList,
	isEdit,
	setIsEdit,
}) => {
	const [newTitle, setNewTitle] = useState(title);
	const inputRef = useRef(null);

	useEffect(() => {
		if (isEdit && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEdit]);

	const { isUpdating, updateTodo } = useUpdateTodo(refreshTodosList);

	const handleUpdate = (id) => {
		const body = { title: newTitle, completed };
		updateTodo(id, body);
	};

	return (
		<>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					handleUpdate(id);
					setIsEdit(false);
				}}
				className={styles.formEdit}
			>
				<input
					type="text"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					placeholder={title}
					className={styles.title}
					ref={inputRef}
					required
				/>
				<IconButton
					type="submit"
					src={approveIcon}
					alt="Принять"
					disabled={isUpdating}
				/>
				<IconButton
					src={cancelIcon}
					alt="Отменить"
					handleOnClick={() => {
						setIsEdit(false);
						setNewTitle(title);
					}}
				/>
			</form>
		</>
	);
};
