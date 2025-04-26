import { API_URL } from "../config/env";

export const fetchData = async (props) => {
	const result = { data: null, error: null };
	const method = props.method || "GET";
	const params = { method };
	const body = props.body || "";
	const search = props.search || {};
	let url = `${API_URL}/todos`;

	if (props.id) {
		url = `${url}/${props.id}`;
	}

	if (method === "GET") {
		url += `?_sort=title&_order=${props.order}`;

		const searchParams = Object.keys(search)
			.map((field) => {
				if (search[field]) {
					return `${field}=${search[field]}`;
				}
			})
			.join("&");

		if (searchParams) {
			url += `&${searchParams}`;
		}
	} else if (body) {
		params.headers = { "Content-Type": "application/json;charset=utf-8" };
		params.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, params);
		const data = await response.json();
		result.data = data;
	} catch (error) {
		result.error = error.message;
	}

	return result;
};
