import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CustomWorld } from '../support/world';

// Set default timeout to 30 seconds
setDefaultTimeout(30 * 1000);

let loginPage: LoginPage;

Given('I am on the login page', async function(this: CustomWorld) {
    try {
        await this.init();
        loginPage = new LoginPage(this.page);
        await loginPage.navigate();
    } catch (error) {
        console.error('Error in Given step:', error);
        throw error;
    }
});

When('I enter username {string}', async function(username: string) {
    await loginPage.enterUsername(username);
});

When('I enter password {string}', async function(password: string) {
    await loginPage.enterPassword(password);
});

When('I click the login button', async function() {
    await loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async function(this: CustomWorld) {
    const welcomeMessage = loginPage.getWelcomeMessage();
    await expect(welcomeMessage).toBeVisible();
    await this.cleanup();
}); 