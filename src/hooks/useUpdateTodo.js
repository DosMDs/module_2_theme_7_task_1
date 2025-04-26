import { useState } from "react";
import { fetchData } from "../utils";

export const useUpdateTodo = (refreshTodosList) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const updateTodo = (id, body) => {
		setIsUpdating(true);

		fetchData({ method: "PUT", id, body })
			.then((result) => {
				refreshTodosList(result);
			})
			.finally(setIsUpdating(false));
	};

	return {
		isUpdating,
		updateTodo,
	};
};
