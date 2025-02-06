import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { obtainToken } from "@/lib/clerkUtils";
import { showError } from "@/components/toast";

const API_BASE_URL = "http://localhost:8000/api/v1";

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
				if (
					Array.isArray(value) &&
					value.every((item) => item instanceof File)
				) {
					value.forEach((file) => formData.append(key, file));
				} else if (
					typeof value === "object" &&
					value !== null &&
					!(value instanceof File)
				) {
					Object.entries(value).forEach(([subKey, subValue]) => {
						const valueToAppend =
							subValue instanceof Blob
								? subValue
								: String(subValue);
						formData.append(subKey, valueToAppend);
					});
				} else {
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