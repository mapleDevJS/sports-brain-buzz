export const CONFIG = {
    ROOT_ELEMENT_ID: 'root',
    ERROR_MESSAGES: {
        ROOT_NOT_FOUND: (id: string) =>
            `Unable to initialize application: Element with ID '${id}' not found.`,
    },
} as const;
