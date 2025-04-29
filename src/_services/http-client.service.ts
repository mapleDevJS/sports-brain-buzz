import ky from 'ky';

import { HttpClient } from '../_application/ports';

const createKyImplementation =
    (client: typeof ky): HttpClient['fetch'] =>
    async (url: string, init?: RequestInit): Promise<Response> =>
        client(url, init);

export const createDefaultHttpClient = (): HttpClient => ({
    fetch: createKyImplementation(ky),
});
