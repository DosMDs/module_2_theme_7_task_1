import { useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { readTodos, createTodo, updateTodo, deleteTodo } from "../utils";

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const loadTodos = async (order = "asc", searchText = "") => {
		setLoading(true);
		setError(null);
		try {
			const data = await readTodos(order, searchText);
			setTodos(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleAdd = async (newTodo) => {
		setLoading(true);
		setError(null);
		try {
			await createTodo(newTodo);
			await loadTodos();
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleUpdate = async (id, updatedFields) => {
		setLoading(true);
		setError(null);
		try {
			await updateTodo(id, updatedFields);
			await loadTodos();
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		setLoading(true);
		setError(null);
		try {
			await deleteTodo(id);
			await loadTodos();
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTodos();
	}, []);

	return (
		<TodoContext
			value={{
				todos,
				loading,
				error,
				loadTodos,
				handleAdd,
				handleUpdate,
				handleDelete,
			}}
		>
			{children}
		</TodoContext>
	);
};
