import { HttpClient, HttpService } from '../../_application/ports/ports';

const HEADERS = {
    BASE: {
        Accept: 'application/json',
    },
    JSON_CONTENT: {
        'Content-Type': 'application/json',
    },
};

const executeRequest = async <T>(
    client: HttpClient,
    url: string,
    method: string,
    options: Partial<RequestInit> = {},
): Promise<HttpResponse<T>> => {
    const response = await client.fetch(url, {
        method,
        headers: {
            ...HEADERS.BASE,
            ...(options.body ? HEADERS.JSON_CONTENT : {}),
        },
        ...options,
    });

    const data = await response.json();
    return { status: response.status, data };
};

export const createHttpService = (client: HttpClient): HttpService => {
    return {
        async get<T>(url: string): Promise<HttpResponse<T>> {
            return executeRequest<T>(client, url, 'GET');
        },

        async post<T, U>(url: string, data: U): Promise<HttpResponse<T>> {
            return executeRequest<T>(client, url, 'POST', {
                body: JSON.stringify(data),
            });
        },

        async put<T, U>(url: string, data: U): Promise<HttpResponse<T>> {
            return executeRequest<T>(client, url, 'PUT', {
                body: JSON.stringify(data),
            });
        },

        async delete<T>(url: string): Promise<HttpResponse<T>> {
            return executeRequest<T>(client, url, 'DELETE');
        },
    };
};
