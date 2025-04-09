import { QuestionRdo, QuizApiService, ResetTokenRdo, TokenRdo } from '../_application/ports.ts';
import { getFetchQuestionsUrl } from '../_lib/getFetchQuestionsUrl.ts';
import { getFetchTokenUrl } from '../_lib/getFetchTokenUrl.ts';
import { getResetTokenUrl } from '../_lib/getResetTokenUrl.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { apiService } from './api.service.ts';

export const quizApiService: QuizApiService = {
    fetchQuestions: async (amount: number, difficulty: Difficulty, token: string) => {
        const url = getFetchQuestionsUrl(amount, difficulty, token);
        return apiService.get<QuestionRdo>(url);
    },
    fetchToken: async () => {
        const url = getFetchTokenUrl();
        return apiService.get<TokenRdo>(url);
    },
    resetToken: async (token: string) => {
        const url = getResetTokenUrl({resetToken: token});
        return apiService.get<ResetTokenRdo>(url);
    },
};
