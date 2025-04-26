import { createContext, useContext, useState, useEffect } from "react";
import { readTodos, createTodo, updateTodo, deleteTodo } from "../utils/";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadTodos = async () => {
			setLoading(true);
			try {
				const data = await readTodos();
				setTodos(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadTodos();
	}, []);

	const handleAdd = async (newTodo) => {
		setLoading(true);
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
		try {
			await deleteTodo(id);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				loading,
				error,
				handleAdd,
				handleUpdate,
				handleDelete,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodos = () => useContext(TodoContext);
