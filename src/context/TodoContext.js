import { createContext, useContext, useState, useEffect } from "react";
import { readTodos, createTodo, updateTodo, deleteTodo } from "../utils/";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadTodos = async () => {
			setLoading(true);
			try {
				const data = await readTodos();
				setTodos(data);
			} catch (error) {
				console.error("Ошибка при загрузке задач:", error);
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
			console.error("Ошибка при добавлении задачи:", error);
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
			console.error("Ошибка при обновлении задачи:", error);
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
			console.error("Ошибка при удалении задачи:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<TodoContext.Provider
			value={{ todos, loading, handleAdd, handleUpdate, handleDelete }}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodos = () => useContext(TodoContext);
