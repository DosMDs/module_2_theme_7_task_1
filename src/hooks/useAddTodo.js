import { useState } from "react";
import { fetchData } from "../utils";

export const useAddTodo = (refreshTodosList) => {
	const [isCreating, setIsCreating] = useState(false);

	const addTodo = (title) => {
		setIsCreating(true);

		const todo = { title, completed: false };
		fetchData({ method: "POST", body: todo })
			.then((result) => {
				refreshTodosList(result);
			})
			.finally(setIsCreating(false));
	};

	return {
		isCreating,
		addTodo,
	};
};
