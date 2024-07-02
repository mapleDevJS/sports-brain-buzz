import { API_URL } from '../constants/api.constants.ts';

export const getResetTokenUrl = (token: string): string => {
    return `${API_URL}/api_token.php?command=reset&token=${token}`;
};
