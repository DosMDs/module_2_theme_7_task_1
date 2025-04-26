import { createContext, useContext, useState, useEffect } from "react";
import { readTodos, createTodo, updateTodo, deleteTodo } from "../utils/";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const loadTodos = async () => {
			try {
				const data = await readTodos();
				setTodos(data);
			} catch (error) {
				console.error("Ошибка при загрузке задач:", error);
			}
		};

		loadTodos();
	}, []);

	const handleAdd = async (newTodo) => {
		try {
			const createdTodo = await createTodo(newTodo);
			setTodos([...todos, createdTodo]);
		} catch (error) {
			console.error("Ошибка при добавлении задачи:", error);
		}
	};

	const handleUpdate = async (id, updatedFields) => {
		try {
			const updatedTodo = await updateTodo(id, updatedFields);
			setTodos(
				todos.map((todo) => (todo.id === id ? updatedTodo : todo))
			);
		} catch (error) {
			console.error("Ошибка при обновлении задачи:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteTodo(id);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error("Ошибка при удалении задачи:", error);
		}
	};

	return (
		<TodoContext.Provider
			value={{ todos, handleAdd, handleUpdate, handleDelete }}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodos = () => useContext(TodoContext);
