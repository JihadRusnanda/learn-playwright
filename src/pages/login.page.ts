import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private selectors = {
        usernameInput: '#username',
        passwordInput: '#password',
        loginButton: '#login-button',
        welcomeMessage: '.welcome-message'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://stockbit.com');
    }

    async enterUsername(username: string) {
        await this.page.fill(this.selectors.usernameInput, username);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.selectors.passwordInput, password);
    }

    async clickLoginButton() {
        await this.page.click(this.selectors.loginButton);
    }

    getWelcomeMessage(): Locator {
        return this.page.locator(this.selectors.welcomeMessage);
    }
} 