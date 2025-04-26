import { useState, useRef, useEffect } from "react";
import approveIcon from "../../assets/approve.svg";
import cancelIcon from "../../assets/cancel.svg";
import { useTodos } from "../../hooks";
import { IconButton } from "../IconButton/IconButton";
import styles from "./TodoItemEdit.module.css";

export const TodoItemEdit = ({ id, title, completed, isEdit, setIsEdit }) => {
	const [newTitle, setNewTitle] = useState(title);
	const inputRef = useRef(null);

	useEffect(() => {
		if (isEdit && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEdit]);

	const { loading, handleUpdate } = useTodos();

	const updateTodo = (id) => {
		const body = { title: newTitle, completed };
		handleUpdate(id, body);
	};

	return (
		<>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					updateTodo(id);
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
					disabled={loading}
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
