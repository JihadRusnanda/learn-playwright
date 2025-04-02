import { createSelectors } from './types';

export const { selectors: LoginSelectors, selector: login, get: loginValue } = createSelectors({
    // Form elements
    usernameInput: 'id_username',
    passwordInput: 'id_password',
    loginButton: 'id_login-button',
    
    // Messages
    welcomeMessage: '.welcome-message',
    
    // Landing page elements
    landingLoginButton: 'cy_landing-login-button',
    investasiSahamHeader: 'xpath_//h1[text()="Investasi Saham Bersama"]',
    
    // Securities login elements
    usernameField: 'id_username',
    passwordField: 'id_password',
    emailLoginButton: 'id_email-login-button'
} as const);

// Type for login selector keys
export type LoginSelectorKey = keyof typeof LoginSelectors; 