import { Page } from '@playwright/test';
import { elementSelector } from '../../selectors/types';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        if (!page) {
            throw new Error('Page is not initialized');
        }
        this.page = page;
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
    }

    protected async waitForElement(selector: string, timeout = 3000): Promise<void> {
        const options = { timeout, state: 'visible' as const };
        await this.page.waitForSelector(elementSelector(selector), options);
    }

    protected async clickElement(selector: string): Promise<void> {
        await this.waitForElement(selector);
        await this.page.click(elementSelector(selector));
    }

    protected async click(selector: string, options = {}): Promise<void> {
        await this.page.locator(elementSelector(selector)).click(options);
    }

    protected async fillInput(selector: string, value: string): Promise<void> {
        await this.waitForElement(selector);
        await this.page.fill(elementSelector(selector), value);
    }
} 