// Simple selector type that just needs a key and value
export type Selector = {
    key: string;
    value: string;
};

// Helper function to format selector value
export function elementSelector(value: string): string {
    if (value.startsWith('xpath_')) {
        return `xpath=${value.replace('xpath_', '')}`;
    }
    if (value.startsWith('id_')) {
        return `#${value.replace('id_', '')}`;
    }
    if (value.startsWith('cy_')) {
        return `[data-cy="${value.replace('cy_', '')}"]`;
    }
    return value;
}

// Generic type for selector keys
export type SelectorKey<T> = keyof T;

// Generic helper function for all selectors
export function getSelector<T extends Record<string, string>>(selectors: T, key: SelectorKey<T>): string {
    return elementSelector(selectors[key]);
}

// Generic selector creator
export function createSelectors<T extends Record<string, string>>(selectors: T) {
    return {
        selectors,
        selector: (key: SelectorKey<T>) => getSelector(selectors, key),
        // Direct access to selector values
        get: (key: SelectorKey<T>) => selectors[key]
    };
} 