import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Config } from '../../config/Config';
import { login, loginValue, LoginSelectorKey } from '../../selectors/login.selectors';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate(config: Config): Promise<void> {
        await this.page.goto(config.baseUrl);
        await this.waitForPageLoad();
    }

    async login(username: string, password: string): Promise<void> {
        if (username) {
            await this.fillInput(login('usernameInput'), username);
        }
        if (password) {
            await this.fillInput(login('passwordInput'), password);
        }
        if (!username && !password) {
            await this.clickElement(login('loginButton'));
            await this.waitForPageLoad();
        }
    }

    async LoginSecurites(username: string, password: string): Promise<void> {
        const headerSelector = loginValue('investasiSahamHeader');
        await this.waitForElement(headerSelector);
        
        await this.clickElement(login('landingLoginButton'));
        await this.fillInput(login('usernameField'), username);
        await this.fillInput(login('passwordField'), password);
        await this.clickElement(login('emailLoginButton'));
        await this.waitForPageLoad();
    }

    getWelcomeMessage(): Locator {
        return this.page.locator(login('welcomeMessage'));
    }
} 