import { useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import { readTodos, createTodo, updateTodo, deleteTodo } from "../utils";

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [order, setOrder] = useState("asc");

	const loadTodos = async () => {
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

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			loadTodos();
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchText, order]);

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

	const changeOrder = () => {
		setOrder(order === "asc" ? "desc" : "asc");
	};

	const changeSearchText = (text) => {
		setSearchText(text);
	};

	return (
		<TodoContext
			value={{
				todos,
				loading,
				error,
				order,
				searchText,
				changeOrder,
				changeSearchText,
				handleAdd,
				handleUpdate,
				handleDelete,
			}}
		>
			{children}
		</TodoContext>
	);
};
