export enum LoginSelectors {
    USERNAME_INPUT = 'login.usernameInput',
    PASSWORD_INPUT = 'login.passwordInput',
    LOGIN_BUTTON = 'login.loginButton',
    WELCOME_MESSAGE = 'login.welcomeMessage',
    ERROR_MESSAGE = 'login.errorMessage'
}

export enum CommonSelectors {
    LOADING_SPINNER = 'common.loadingSpinner',
    TOAST_MESSAGE = 'common.toastMessage'
}

// Type for all possible selector keys
export type SelectorKey = LoginSelectors | CommonSelectors; 