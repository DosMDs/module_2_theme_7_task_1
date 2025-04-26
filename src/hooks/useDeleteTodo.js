import { useState } from "react";
import { fetchData } from "../utils";

export const useDeleteTodo = (refreshTodosList) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTodo = (id) => {
		setIsDeleting(true);

		fetchData({ method: "DELETE", id })
			.then((result) => {
				refreshTodosList(result);
			})
			.finally(setIsDeleting(false));
	};

	return {
		isDeleting,
		deleteTodo,
	};
};
