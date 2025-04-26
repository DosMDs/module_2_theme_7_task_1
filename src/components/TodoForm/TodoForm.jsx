import { useState, useEffect } from "react";
import clearIcon from "../../assets/clear.svg";
import styles from "./TodoForm.module.css";
import { useAddTodo } from "../../hooks";
import { IconButton } from "../IconButton/IconButton";
import sortAscIcon from "../../assets/sort-asc.svg";
import sortDescIcon from "../../assets/sort-desc.svg";

export const TodoForm = ({
	setTitleToSearch,
	refreshTodosList,
	sortOrder,
	changeSortOrder,
}) => {
	const [newTodo, setNewTodo] = useState("");
	const [searchValue, setSearchValue] = useState("");

	const { isCreating, addTodo } = useAddTodo(refreshTodosList);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setTitleToSearch(searchValue);
		}, 300);
		return () => clearTimeout(timeout);
	}, [searchValue, setTitleToSearch]);

	const handleSubmit = (event) => {
		event.preventDefault();

		addTodo(newTodo);
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
					disabled={isCreating}
				>
					Добавить новую задачу
				</button>
			</form>

			<div className={styles.searchWrapper}>
				<input
					type="text"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Поиск задач"
					className={styles.searchInput}
				/>
				<button
					type="button"
					className={styles.clearBtn}
					onClick={() => setSearchValue("")}
					aria-label="Очистить поиск"
				>
					<img src={clearIcon} alt="X" className={styles.clearIcon} />
				</button>
				<IconButton
					handleOnClick={changeSortOrder}
					src={sortOrder === "asc" ? sortAscIcon : sortDescIcon}
					alt="Сортировать"
				/>
			</div>
		</div>
	);
};
