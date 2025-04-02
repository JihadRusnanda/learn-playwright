import { World, setWorldConstructor, IWorldOptions, After, Status, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { createConfig } from '../config/Config';
import * as path from 'path';
import * as fs from 'fs';

// Set default timeout to 30 seconds
setDefaultTimeout(30 * 1000);

// Ensure screenshots directory exists
const screenshotsDir = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Ensure videos directory exists
const videosDir = path.join(process.cwd(), 'videos');
if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
}

export class CustomWorld extends World {
    private browser: Browser | undefined;
    private context: BrowserContext | undefined;
    public page: Page | undefined;
    private config = createConfig();
    private initPromise: Promise<void>;
    private scenarioFailed: boolean = false;

    constructor(options: IWorldOptions) {
        super(options);
        this.initPromise = this.init();
    }

    async init() {
        try {
            // Launch browser with configuration
            this.browser = await chromium.launch({
                headless: this.config.headless,
                args: [
                    '--start-maximized',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-dev-shm-usage'
                ],
                slowMo: 50
            });
            
            // Create context with configuration
            this.context = await this.browser.newContext({
                viewport: null, // This will allow the browser to be truly full screen
                recordVideo: { 
                    dir: videosDir,
                    size: { width: 1920, height: 1080 }
                }
            });
            
            // Create new page
            this.page = await this.context.newPage();
            
            // Set default timeout
            this.page.setDefaultTimeout(30000);
            
            // Navigate to base URL
            await this.page.goto(this.config.baseUrl);

            console.log('Browser initialized successfully');
        } catch (error) {
            console.error('Browser initialization failed:', error);
            await this.cleanup();
            throw error;
        }
    }

    async cleanup() {
        const timeout = 5000; // 5 seconds timeout for each operation

        try {
            // Close page with timeout
            if (this.page && !this.page.isClosed()) {
                await Promise.race([
                    this.page.close(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Page close timeout')), timeout))
                ]).catch(console.error);
                this.page = undefined;
                console.log('Page closed');
            }

            // Close context with timeout
            if (this.context) {
                // If scenario failed, save the video
                if (this.hasScenarioFailed()) {
                    console.log('Scenario failed, saving video recording');
                } else {
                    // If scenario passed, discard the video
                    console.log('Scenario passed, discarding video recording');
                    try {
                        // Find and delete the most recent video file in the videos directory
                        const files = fs.readdirSync(videosDir);
                        const videoFiles = files.filter(file => file.endsWith('.webm'));
                        if (videoFiles.length > 0) {
                            // Sort by modification time to get the most recent
                            const mostRecentVideo = videoFiles
                                .map(file => ({
                                    name: file,
                                    time: fs.statSync(path.join(videosDir, file)).mtime.getTime()
                                }))
                                .sort((a, b) => b.time - a.time)[0];
                            
                            if (mostRecentVideo) {
                                fs.unlinkSync(path.join(videosDir, mostRecentVideo.name));
                            }
                        }
                    } catch (error) {
                        console.error('Error discarding video:', error);
                    }
                }

                await Promise.race([
                    this.context.close(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Context close timeout')), timeout))
                ]).catch(console.error);
                this.context = undefined;
                console.log('Browser context closed');
            }

            // Close browser with timeout
            if (this.browser) {
                await Promise.race([
                    this.browser.close(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Browser close timeout')), timeout))
                ]).catch(console.error);
                this.browser = undefined;
                console.log('Browser closed');
            }
        } catch (error) {
            console.error('Cleanup failed:', error);
            // Force cleanup by nullifying references
            this.page = undefined;
            this.context = undefined;
            this.browser = undefined;
        }
    }

    // Helper method to take screenshot
    async takeScreenshot(name: string) {
        try {
            await this.initPromise; // Wait for initialization to complete
            if (!this.page || this.page.isClosed()) {
                throw new Error('Page is not initialized or has been closed');
            }
            const screenshotPath = path.join(screenshotsDir, `${name.replace(/\s+/g, '_')}.png`);
            await this.page.screenshot({
                path: screenshotPath,
                fullPage: true
            });
            return screenshotPath;
        } catch (error) {
            console.error('Screenshot failed:', error);
            throw error;
        }
    }

    // Helper method to get the current page
    async getPage(): Promise<Page> {
        await this.initPromise;
        if (!this.page || this.page.isClosed()) {
            throw new Error('Page is not initialized or has been closed');
        }
        return this.page;
    }

    // Helper method to mark scenario as failed
    markScenarioAsFailed() {
        this.scenarioFailed = true;
    }

    // Helper method to check if scenario failed
    hasScenarioFailed(): boolean {
        return this.scenarioFailed;
    }
}

// Register cleanup hook
After(async function(scenario) {
    const scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
    
    // Mark scenario as failed if it failed
    if (scenario.result?.status === Status.FAILED) {
        this.markScenarioAsFailed();
        try {
            const screenshotPath = await this.takeScreenshot(scenarioName);
            await this.attach(fs.readFileSync(screenshotPath), 'image/png');
        } catch (error) {
            console.error('Failed to take screenshot:', error);
        }
    }
    
    // Cleanup browser resources
    await this.cleanup().catch((error: Error) => {
        console.error('Failed to cleanup:', error);
    });
    
    console.log(`Finished scenario: ${scenarioName}`);
});

setWorldConstructor(CustomWorld); 