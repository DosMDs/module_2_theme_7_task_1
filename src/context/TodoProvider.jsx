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
			const createdTodo = await createTodo(newTodo);
			setTodos([...todos, createdTodo]);
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
			const updatedTodo = await updateTodo(id, updatedFields);
			setTodos(
				todos.map((todo) => (todo.id === id ? updatedTodo : todo))
			);
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
			setTodos(todos.filter((todo) => todo.id !== id));
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
