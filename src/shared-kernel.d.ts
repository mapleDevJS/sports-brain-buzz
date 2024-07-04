interface HttpResponse<T> {
    status: number;
    data: T;
}

type TokenKey = 'sessionToken';
