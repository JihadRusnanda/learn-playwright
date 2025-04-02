import { createConfig } from '../Config';

describe('Config', () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        // Store original environment variables
        originalEnv = { ...process.env };
        // Clear environment variables before each test
        process.env = {};
    });

    afterEach(() => {
        // Restore original environment variables
        process.env = originalEnv;
    });

    it('should use default values when no environment variables are set', () => {
        const config = createConfig();
        
        expect(config.baseUrl).toBe('https://stockbit.com');
        expect(config.timeout).toBe(30000);
        expect(config.headless).toBe(false);
        expect(config.viewport.width).toBe(1920);
        expect(config.viewport.height).toBe(1080);
        expect(config.retries).toBe(2);
    });

    it('should use environment variables when set', () => {
        // Set environment variables
        process.env.BASE_URL = 'https://test.com';
        process.env.TIMEOUT = '5000';
        process.env.HEADLESS = 'true';
        process.env.VIEWPORT_WIDTH = '1280';
        process.env.VIEWPORT_HEIGHT = '720';
        process.env.RETRIES = '3';

        const config = createConfig();

        expect(config.baseUrl).toBe('https://test.com');
        expect(config.timeout).toBe(5000);
        expect(config.headless).toBe(true);
        expect(config.viewport.width).toBe(1280);
        expect(config.viewport.height).toBe(720);
        expect(config.retries).toBe(3);
    });

    it('should handle invalid environment variables gracefully', () => {
        // Set invalid environment variables
        process.env.TIMEOUT = 'invalid';
        process.env.VIEWPORT_WIDTH = 'invalid';
        process.env.VIEWPORT_HEIGHT = 'invalid';
        process.env.RETRIES = 'invalid';

        const config = createConfig();

        expect(config.timeout).toBe(30000); // Default value
        expect(config.viewport.width).toBe(1920); // Default value
        expect(config.viewport.height).toBe(1080); // Default value
        expect(config.retries).toBe(2); // Default value
    });

    it('should handle empty environment variables', () => {
        // Set empty environment variables
        process.env.BASE_URL = '';
        process.env.TIMEOUT = '';
        process.env.HEADLESS = '';
        process.env.VIEWPORT_WIDTH = '';
        process.env.VIEWPORT_HEIGHT = '';
        process.env.RETRIES = '';

        const config = createConfig();

        expect(config.baseUrl).toBe('https://stockbit.com');
        expect(config.timeout).toBe(30000);
        expect(config.headless).toBe(false);
        expect(config.viewport.width).toBe(1920);
        expect(config.viewport.height).toBe(1080);
        expect(config.retries).toBe(2);
    });
}); 