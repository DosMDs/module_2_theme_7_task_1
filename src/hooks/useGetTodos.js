import { useEffect, useState } from "react";
import { fetchData } from "../utils";

export const useGetTodos = (titleToSearch, refreshTodosFlag, setError) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sortOrder, setSortOrder] = useState("asc");

	const changeSortOrder = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	useEffect(() => {
		setIsLoading(true);

		fetchData({
			search: { title_like: titleToSearch },
			order: sortOrder,
		})
			.then((result) => {
				setTodos(result.data);
				setError(result.error);
			})
			.finally(setIsLoading(false));
	}, [refreshTodosFlag, titleToSearch, setError, sortOrder]);

	return { todos, isLoading, sortOrder, changeSortOrder };
};
