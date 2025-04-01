import { World, setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class CustomWorld extends World {
    private browser: Browser | undefined;
    private context: BrowserContext | undefined;
    public page!: Page;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {
        this.browser = await chromium.launch({
            headless: false,
            args: ['--start-maximized'],
            slowMo: 50, // Slows down Playwright operations by 50ms
            devtools: true // Opens DevTools
        });
        
        this.context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
            recordVideo: { dir: 'videos/' }
        });
        
        this.page = await this.context.newPage();
    }

    async cleanup() {
        if (this.context) await this.context.close();
        if (this.browser) await this.browser.close();
    }
}

setWorldConstructor(CustomWorld); 