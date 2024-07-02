import { httpService } from './http.service.ts';
import { ApiService } from '../_application/ports.ts';

export const apiService: ApiService = {
    get: <T>(url: string) => httpService.get<T>(url),
    post: <T, U>(url: string, data: U) => httpService.post<T, U>(url, data),
    put: <T, U>(url: string, data: U) => httpService.put<T, U>(url, data),
    delete: <T>(url: string) => httpService.delete<T>(url),
};
