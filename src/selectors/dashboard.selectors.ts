import { createSelectors } from './types';

export const { selectors: DashboardSelectors, selector: dashboard } = createSelectors({
    // Navigation
    menuButton: 'cy_menu-button',
    logoutButton: 'id_logout-button',
    
    // Content sections
    welcomeSection: '.welcome-section',
    statsContainer: '.stats-container',
    
    // Data tables
    tableContainer: '.data-table',
    tableRows: '.table-row'
} as const);

// Type for dashboard selector keys
export type DashboardSelectorKey = keyof typeof DashboardSelectors; 