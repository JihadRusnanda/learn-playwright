import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Config } from '../../config/Config';

export class LoginPage extends BasePage {
    private selectors = {
        usernameInput: '#username',
        passwordInput: '#password',
        loginButton: '#login-button',
        welcomeMessage: '.welcome-message',
        landingLoginButton: 'cy_landing-login-button',
        usernameField: 'id_username',
        passwordField: 'id_password',
        emailLoginButton: 'id_email-login-button',
        investasiSahamHeader: "xpath_//h1[text()='Investasi Saham Bersama']"
    };

    constructor(page: Page) {
        super(page);
    }

    async navigate(config: Config): Promise<void> {
        await this.page.goto(config.baseUrl);
        await this.waitForPageLoad();
    }

    async login(username: string, password: string): Promise<void> {
        if (username) {
            await this.fillInput(this.selectors.usernameInput, username);
        }
        if (password) {
            await this.fillInput(this.selectors.passwordInput, password);
        }
        if (!username && !password) {
            await this.clickElement(this.selectors.loginButton);
            await this.waitForPageLoad();
        }
    }

    async LoginSecurites(username: string, password: string): Promise<void> {
        await this.waitForElement(this.selectors.investasiSahamHeader);
        await this.clickElement(this.selectors.landingLoginButton);
        await this.fillInput(this.selectors.usernameField, username);
        await this.fillInput(this.selectors.passwordField, password);
        await this.clickElement(this.selectors.emailLoginButton);
        await this.waitForPageLoad();
    }

    getWelcomeMessage(): Locator {
        return this.page.locator(this.selectors.welcomeMessage);
    }
} 