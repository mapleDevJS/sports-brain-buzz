import { useContext } from 'react';

import { QuizStorageService } from '../../../_application/ports/ports.ts';
import { QuizStoreContext } from './quizStore-context.ts';

export const useStore = () => useContext<QuizStorageService>(QuizStoreContext);
