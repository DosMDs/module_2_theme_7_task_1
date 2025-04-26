import { TODOS_URL } from "../constants";
import { request } from "./request";

export const deleteTodo = async (id) => {
	return await request(`${TODOS_URL}/${id}`, {
		method: "DELETE",
	});
};
