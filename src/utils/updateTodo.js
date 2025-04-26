import { TODOS_URL } from "../constants";
import { request } from "./request";

export const updateTodo = async (id, todo) => {
	return await request(`${TODOS_URL}/${id}`, {
		method: "PUT",
		body: JSON.stringify(todo),
	});
};
