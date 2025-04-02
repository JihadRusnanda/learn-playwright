import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

// Create a concrete implementation of BasePage for testing
class TestPage extends BasePage {
    async testWaitForElement(selector: string, timeout = 3000): Promise<void> {
        await this.waitForElement(selector, timeout);
    }

    async testClickElement(selector: string): Promise<void> {
        await this.clickElement(selector);
    }

    async testClick(selector: string, options = {}): Promise<void> {
        await this.click(selector, options);
    }

    async testFillInput(selector: string, value: string): Promise<void> {
        await this.fillInput(selector, value);
    }
}

// Mock the Page class
jest.mock('@playwright/test', () => ({
    Page: jest.fn().mockImplementation(() => ({
        waitForLoadState: jest.fn(),
        waitForSelector: jest.fn(),
        click: jest.fn(),
        fill: jest.fn(),
        locator: jest.fn().mockImplementation((selector: string) => ({
            click: jest.fn().mockImplementation((options) => {
                // Store the options for later verification
                (this as any).lastClickOptions = options;
            })
        }))
    }))
}));

describe('BasePage', () => {
    let testPage: TestPage;
    let mockPage: jest.Mocked<Page>;

    beforeEach(() => {
        mockPage = new (jest.requireMock('@playwright/test').Page)() as jest.Mocked<Page>;
        testPage = new TestPage(mockPage);
    });

    describe('constructor', () => {
        it('should throw error if page is not initialized', () => {
            expect(() => new TestPage(null as unknown as Page)).toThrow('Page is not initialized');
        });
    });

    describe('waitForPageLoad', () => {
        it('should wait for both load states', async () => {
            await testPage.waitForPageLoad();
            expect(mockPage.waitForLoadState).toHaveBeenCalledWith('domcontentloaded');
            expect(mockPage.waitForLoadState).toHaveBeenCalledWith('load');
        });
    });

    describe('waitForElement', () => {
        it('should wait for regular selector', async () => {
            await testPage.testWaitForElement('div');
            expect(mockPage.waitForSelector).toHaveBeenCalledWith('div', { timeout: 3000, state: 'visible' });
        });

        it('should wait for xpath selector', async () => {
            await testPage.testWaitForElement('xpath_//div');
            expect(mockPage.waitForSelector).toHaveBeenCalledWith('xpath=//div', { timeout: 3000, state: 'visible' });
        });

        it('should wait for id selector', async () => {
            await testPage.testWaitForElement('id_test');
            expect(mockPage.waitForSelector).toHaveBeenCalledWith('#test', { timeout: 3000, state: 'visible' });
        });

        it('should wait for cy selector', async () => {
            await testPage.testWaitForElement('cy_test');
            expect(mockPage.waitForSelector).toHaveBeenCalledWith('[data-cy="test"]', { timeout: 3000, state: 'visible' });
        });
    });

    describe('clickElement', () => {
        it('should click regular selector', async () => {
            await testPage.testClickElement('div');
            expect(mockPage.click).toHaveBeenCalledWith('div');
        });

        it('should click xpath selector', async () => {
            await testPage.testClickElement('xpath_//div');
            expect(mockPage.click).toHaveBeenCalledWith('xpath=//div');
        });

        it('should click id selector', async () => {
            await testPage.testClickElement('id_test');
            expect(mockPage.click).toHaveBeenCalledWith('#test');
        });

        it('should click cy selector', async () => {
            await testPage.testClickElement('cy_test');
            expect(mockPage.click).toHaveBeenCalledWith('[data-cy="test"]');
        });
    });

    describe('click', () => {
        it('should click regular selector with options', async () => {
            const options = { timeout: 1000 };
            await testPage.testClick('div', options);
            expect(mockPage.locator).toHaveBeenCalledWith('div');
            const mockLocator = mockPage.locator('div');
            mockLocator.click(options);
            expect(mockLocator.click).toHaveBeenCalledWith(options);
        });

        it('should click xpath selector', async () => {
            await testPage.testClick('xpath_//div');
            expect(mockPage.locator).toHaveBeenCalledWith('xpath=//div');
        });

        it('should click id selector', async () => {
            await testPage.testClick('id_test');
            expect(mockPage.locator).toHaveBeenCalledWith('#test');
        });

        it('should click cy selector', async () => {
            await testPage.testClick('cy_test');
            expect(mockPage.locator).toHaveBeenCalledWith('[data-cy="test"]');
        });
    });

    describe('fillInput', () => {
        it('should fill regular selector', async () => {
            await testPage.testFillInput('input', 'test');
            expect(mockPage.fill).toHaveBeenCalledWith('input', 'test');
        });

        it('should fill xpath selector', async () => {
            await testPage.testFillInput('xpath_//input', 'test');
            expect(mockPage.fill).toHaveBeenCalledWith('xpath=//input', 'test');
        });

        it('should fill id selector', async () => {
            await testPage.testFillInput('id_test', 'test');
            expect(mockPage.fill).toHaveBeenCalledWith('#test', 'test');
        });

        it('should fill cy selector', async () => {
            await testPage.testFillInput('cy_test', 'test');
            expect(mockPage.fill).toHaveBeenCalledWith('[data-cy="test"]', 'test');
        });
    });
}); 