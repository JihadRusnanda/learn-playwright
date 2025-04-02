import { SelectorKey, LoginSelectors, CommonSelectors } from '../properties/Selectors';

export class PropertiesManager {
    private static instance: PropertiesManager;
    private selectors: Map<SelectorKey, string>;

    private constructor() {
        this.selectors = new Map();
        this.initializeSelectors();
    }

    public static getInstance(): PropertiesManager {
        if (!PropertiesManager.instance) {
            PropertiesManager.instance = new PropertiesManager();
        }
        return PropertiesManager.instance;
    }

    private initializeSelectors(): void {
        // Login page selectors
        this.selectors.set(LoginSelectors.USERNAME_INPUT, '#username');
        this.selectors.set(LoginSelectors.PASSWORD_INPUT, '#password');
        this.selectors.set(LoginSelectors.LOGIN_BUTTON, '#login-button');
        this.selectors.set(LoginSelectors.WELCOME_MESSAGE, '.welcome-message');
        this.selectors.set(LoginSelectors.ERROR_MESSAGE, '.error-message');

        // Common selectors
        this.selectors.set(CommonSelectors.LOADING_SPINNER, '.loading-spinner');
        this.selectors.set(CommonSelectors.TOAST_MESSAGE, '.toast-message');
    }

    public getSelector(key: SelectorKey): string {
        const selector = this.selectors.get(key);
        if (!selector) {
            throw new Error(`Selector not found for key: ${key}`);
        }
        return selector;
    }
} 