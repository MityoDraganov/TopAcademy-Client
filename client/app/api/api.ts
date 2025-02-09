import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { obtainToken } from "@/lib/clerkUtils";
import { showError } from "@/components/toast";

const API_BASE_URL = "http://78.47.222.81/api/v1";

interface RequestOptions {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	url: string;
	data?: unknown;
	type?: "json" | "formData";
	retry?: boolean;
}

const request = async <T>({
	method,
	url,
	data,
	type = "json",
	retry = true,
}: RequestOptions): Promise<T | null> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 50)); // Short delay before request

		const token: string | null = await obtainToken();
		if (!token || token === null) throw new Error("Authentication failed");

		const config: AxiosRequestConfig = {
			method,
			url: `${API_BASE_URL}${url}`,
			headers: { Authorization: `Bearer ${token}` },
		};

		if (type === "formData") {
			const formData = new FormData();

			Object.entries(data || {}).forEach(([key, value]) => {
				if (value instanceof File) {
					// If the value is a single File, append it directly
					formData.append(key, value);
				} else if (Array.isArray(value)) {
					// Handle arrays
					// 1. If the array is of Files:
					if (value.every((item) => item instanceof File)) {
						value.forEach((file: File) =>
							formData.append(key, file)
						);
					}
					// 2. If the array is of objects (e.g. Ingredient objects)
					else if (
						value.every(
							(item) => typeof item === "object" && item !== null
						)
					) {
						value.forEach((item, index) => {
							Object.entries(item).forEach(
								([subKey, subValue]) => {
									// Append each property with an indexed key:
									// e.g., "ingredients[0].name", "ingredients[0].weight"
									formData.append(
										`${key}[${index}].${subKey}`,
										String(subValue)
									);
								}
							);
						});
					}
					// 3. If the array is of primitives (e.g. strings for labels)
					else {
						// Append each primitive value using the same key so that on the backend
						// form.Value["labels"] is an array of strings.
						value.forEach((item) =>
							formData.append(key, String(item))
						);
					}
				} else if (
					typeof value === "object" &&
					value !== null &&
					!(value instanceof File)
				) {
					// For nested objects (that are not arrays or Files)
					// If you need a special flattening (e.g. for macros), you could check the key here.
					// For now, we'll use dot notation.
					Object.entries(value).forEach(([subKey, subValue]) => {
						formData.append(`${key}.${subKey}`, String(subValue));
					});
				} else {
					// For primitives (strings, numbers, etc.)
					formData.append(key, String(value));
				}
			});

			config.data = formData;
		} else {
			config.headers = {
				...config.headers,
				"Content-Type": "application/json",
			};
			config.data = JSON.stringify(data);
		}

		const response: AxiosResponse<T> = await axios(config);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response) {
			if (error.response.status === 401 && retry) {
				const newToken: string | null = await obtainToken();
				if (newToken) {
					return request<T>({
						method,
						url,
						data,
						type,
						retry: false,
					});
				}
			}
			showError(error.response.data?.error || "Request failed");
		} else {
			console.error("Network or unexpected error", error);
			showError("Network Error");
		}
		return null;
	}
};

export const get = <T>(url: string) => request<T>({ method: "GET", url });
export const post = <T>(
	url: string,
	data?: unknown,
	type?: "json" | "formData"
) => request<T>({ method: "POST", url, data, type });
export const put = <T>(url: string, data?: unknown) =>
	request<T>({ method: "PUT", url, data });
export const patch = <T>(url: string, data?: unknown) =>
	request<T>({ method: "PATCH", url, data });
export const del = <T>(url: string) => request<T>({ method: "DELETE", url });
