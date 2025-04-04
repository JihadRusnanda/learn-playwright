import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { createConfig } from '../config/Config';

Given('I am on the login page', async function() {
    const page = await this.getPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigate(createConfig());
});

Given('User login to securities using {string} account', async function(account: string) {
    const page = await this.getPage();
    const loginPage = new LoginPage(page);
    await loginPage.LoginSecurites("jihad1", "stockbil");
});

When('I enter username {string}', async function(username: string) {
    const page = await this.getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(username, '');
});

When('I enter password {string}', async function(password: string) {
    const page = await this.getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login('', password);
});

When('I click the login button', async function() {
    const page = await this.getPage();
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
});

Then('I should be logged in successfully', async function() {
    const page = await this.getPage();
    const loginPage = new LoginPage(page);
    const welcomeMessage = loginPage.getWelcomeMessage();
    await expect(welcomeMessage).toBeVisible();
    await expect(welcomeMessage).toContainText('Welcome');
}); 