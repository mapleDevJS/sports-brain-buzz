import { useContext } from 'react';

import { QuizStorageService } from '../../../_application/ports/ports';
import { QuizStoreContext } from './quizStore-context';

export const useStore = () => useContext<QuizStorageService>(QuizStoreContext);
