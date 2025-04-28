import { HttpService } from '../_application/ports.ts';

export const httpService: HttpService = {
    async get<T>(url: string): Promise<HttpResponse<T>> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        return { status: response.status, data };
    },

    async post<T, U>(url: string, data: U): Promise<HttpResponse<T>> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return { status: response.status, data: responseData };
    },

    async put<T, U>(url: string, data: U): Promise<HttpResponse<T>> {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return { status: response.status, data: responseData };
    },

    async delete<T>(url: string): Promise<HttpResponse<T>> {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        return { status: response.status, data };
    },
};
