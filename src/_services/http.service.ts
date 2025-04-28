import ky from 'ky';

import { HttpService } from '../_application/ports.ts';

export const createHttpService = (client: typeof ky): HttpService => ({
    async get<T>(url: string): Promise<HttpResponse<T>> {
        const response = await client.get(url);
        const data = await response.json<T>();
        return { status: response.status, data };
    },

    async post<T, U>(url: string, data: U): Promise<HttpResponse<T>> {
        const response = await client.post(url, { json: data });
        const responseData = await response.json<T>();
        return { status: response.status, data: responseData };
    },

    async put<T, U>(url: string, data: U): Promise<HttpResponse<T>> {
        const response = await client.put(url, { json: data });
        const responseData = await response.json<T>();
        return { status: response.status, data: responseData };
    },

    async delete<T>(url: string): Promise<HttpResponse<T>> {
        const response = await client.delete(url);
        const data = await response.json<T>();
        return { status: response.status, data };
    },
});

// Create the default instance with a common configuration
const defaultClient = ky.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Export the default configured instance
export const httpService = createHttpService(defaultClient);
