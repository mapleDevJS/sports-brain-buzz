import { useContext } from 'react';

import { QuizStorageService } from '../../_application/ports.ts';
import { StoreContext } from './store-context.ts';

export const useStore = () => useContext<QuizStorageService>(StoreContext);
