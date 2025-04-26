export const request = async (url, options = {}) => {
	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		...options,
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Ошибка выполнения запроса ${response.status}: ${errorText}`
		);
	}

	return response.json();
};
