import { TODOS_URL } from "../constants";
import { request } from "./request";

export const createTodo = async (todo) => {
	return await request(TODOS_URL, {
		method: "POST",
		body: JSON.stringify(todo),
	});
};
