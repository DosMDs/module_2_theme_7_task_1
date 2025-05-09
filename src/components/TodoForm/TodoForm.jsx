import { useState } from "react";
import clearIcon from "../../assets/clear.svg";
import styles from "./TodoForm.module.css";
import { useTodos } from "../../hooks";
import { IconButton } from "../IconButton/IconButton";
import sortAscIcon from "../../assets/sort-asc.svg";
import sortDescIcon from "../../assets/sort-desc.svg";

export const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");

	const {
		loading,
		order,
		searchText,
		changeOrder,
		changeSearchText,
		handleAdd,
	} = useTodos();

	const handleSubmit = (event) => {
		event.preventDefault();

		handleAdd({ title: newTodo, completed: false });
	};

	return (
		<div className={styles.todoFormWrapper}>
			<form onSubmit={handleSubmit} className={styles.todoForm}>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Название задачи"
					className={styles.todoInput}
					required
				/>
				<button
					type="submit"
					className={styles.addBtn}
					disabled={loading}
				>
					Добавить новую задачу
				</button>
			</form>

			<div className={styles.searchWrapper}>
				<input
					type="text"
					value={searchText}
					onChange={(e) => changeSearchText(e.target.value)}
					placeholder="Поиск задач"
					className={styles.searchInput}
				/>
				<button
					type="button"
					className={styles.clearBtn}
					onClick={() => changeSearchText("")}
					aria-label="Очистить поиск"
				>
					<img src={clearIcon} alt="X" className={styles.clearIcon} />
				</button>
				<IconButton
					handleOnClick={changeOrder}
					src={order === "asc" ? sortAscIcon : sortDescIcon}
					alt="Сортировать"
				/>
			</div>
		</div>
	);
};
