import { Page } from '@playwright/test';

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
        if (selector.startsWith('xpath_')) {
            const xpathSelector = selector.replace('xpath_', '');
            await this.page.waitForSelector(`xpath=${xpathSelector}`, options);
        } else if (selector.startsWith('id_')) {
            const idSelector = selector.replace('id_', '#');
            await this.page.waitForSelector(idSelector, options);
        } else if (selector.startsWith('cy_')) {
            const cySelector = selector.replace('cy_', '[data-cy="');
            await this.page.waitForSelector(`${cySelector}"]`, options);
        } else {
            await this.page.waitForSelector(selector, options);
        }
    }

    protected async clickElement(selector: string): Promise<void> {
        await this.waitForElement(selector);
        if (selector.startsWith('xpath_')) {
            const xpathSelector = selector.replace('xpath_', '');
            await this.page.click(`xpath=${xpathSelector}`);
        } else if (selector.startsWith('id_')) {
            const idSelector = selector.replace('id_', '#');
            await this.page.click(idSelector);
        } else if (selector.startsWith('cy_')) {
            const cySelector = selector.replace('cy_', '[data-cy="');
            await this.page.click(`${cySelector}"]`);
        } else {
            await this.page.click(selector);
        }
    }

    protected async click(selector: string, options = {}): Promise<void> {
        if (selector.startsWith('xpath_')) {
            const xpathSelector = selector.replace('xpath_', '');
            await this.page.locator(`xpath=${xpathSelector}`).click(options);
        } else if (selector.startsWith('id_')) {
            const idSelector = selector.replace('id_', '#');
            await this.page.locator(idSelector).click(options);
        } else if (selector.startsWith('cy_')) {
            const cySelector = selector.replace('cy_', '[data-cy="');
            await this.page.locator(`${cySelector}"]`).click(options);
        } else {
            await this.page.locator(selector).click(options);
        }
    }

    protected async fillInput(selector: string, value: string): Promise<void> {
        await this.waitForElement(selector);
        if (selector.startsWith('xpath_')) {
            const xpathSelector = selector.replace('xpath_', '');
            await this.page.fill(`xpath=${xpathSelector}`, value);
        } else if (selector.startsWith('id_')) {
            const idSelector = selector.replace('id_', '#');
            await this.page.fill(idSelector, value);
        } else if (selector.startsWith('cy_')) {
            const cySelector = selector.replace('cy_', '[data-cy="');
            await this.page.fill(`${cySelector}"]`, value);
        } else {
            await this.page.fill(selector, value);
        }
    }
} 