import { useContext } from 'react';

import { QuizStorageService } from '../../../_application/ports/ports.ts';
import { QuizStoreContext } from './quiz-store.context.ts';

export const useStore = () => useContext<QuizStorageService>(QuizStoreContext);
