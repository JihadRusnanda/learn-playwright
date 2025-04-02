import { createSelectors } from './types';

export const { selectors: CommonSelectors, selector: common } = createSelectors({
    // Loading states
    loadingSpinner: '.loading-spinner',
    
    // Messages
    toastMessage: '.toast-message',
    
    // Navigation
    backButton: 'cy_back-button',
    
    // Error states
    errorMessage: '.error-message'
} as const);

// Type for common selector keys
export type CommonSelectorKey = keyof typeof CommonSelectors; 