import { useCallback } from 'react';

import { useQuizStorage } from '../../_services/storage/storageAdapters';

export const useUndoAnswer = () => {
    const { undoAnswer } = useQuizStorage();

    return useCallback(() => {
        undoAnswer();
    }, [undoAnswer]);
};
