import { API_URL } from '../constants/api.constants.ts';

export const getFetchTokenUrl = (): string => {
    return `${API_URL}/api_token.php?command=request`;
};
