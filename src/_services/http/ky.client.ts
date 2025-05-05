import ky from 'ky';

import { HttpClient } from '../../_application/ports/ports.ts';

export const createKyClient =
    (): HttpClient['fetch'] =>
    async (url: string, init?: RequestInit): Promise<Response> =>
        ky(url, init);
