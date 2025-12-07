import { HttpClient } from '../../_application/ports/ports';
import { createKyClient } from './ky.client';

export const createDefaultHttpClient = (): HttpClient => ({
    fetch: createKyClient(),
});
