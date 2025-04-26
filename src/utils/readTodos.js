import { TODOS_URL } from "../constants";
import { request } from "./request";

export const readTodos = async (order = "asc", searchText = "") => {
	let url = `${TODOS_URL}?_sort=title&_order=${order}`;

	if (searchText) {
		url += `&title=${searchText}`;
	}

	return await request(url);
};
