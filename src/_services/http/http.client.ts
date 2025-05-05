import { HttpClient } from '../../_application/ports/ports.ts';
import { createKyClient } from './ky.client.ts';

export const createDefaultHttpClient = (): HttpClient => ({
    fetch: createKyClient(),
});
