import { QuestionRdo, QuizApiService, ResetTokenRdo, TokenRdo } from '../_application/ports.ts';
import { getFetchQuestionsUrl } from '../_lib/getFetchQuestionsUrl.ts';
import { getFetchTokenUrl } from '../_lib/getFetchTokenUrl.ts';
import { getResetTokenUrl } from '../_lib/getResetTokenUrl.ts';
import { Difficulty } from '../types/difficulty.enum.ts';
import { httpService } from './http.service.ts';

export const quizApiService: QuizApiService = {
    fetchQuestions: async (amount: number, difficulty: Difficulty, token: string) => {
        const url = getFetchQuestionsUrl(amount, difficulty, token);
        return httpService.get<QuestionRdo>(url);
    },
    fetchToken: async () => {
        const url = getFetchTokenUrl();
        return httpService.get<TokenRdo>(url);
    },
    resetToken: async (token: string) => {
        const url = getResetTokenUrl({ resetToken: token });
        return httpService.get<ResetTokenRdo>(url);
    },
};
