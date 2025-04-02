// Define the configuration type
export type Config = {
    baseUrl: string;
    timeout: number;
    headless: boolean;
    viewport: {
        width: number;
        height: number;
    };
    retries: number;
};

// Factory function to create config
export const createConfig = (): Config => ({
    baseUrl: process.env.BASE_URL || 'https://stockbit.com',
    timeout: Number(process.env.TIMEOUT) || 30000,
    headless: process.env.HEADLESS === 'true',
    viewport: {
        width: Number(process.env.VIEWPORT_WIDTH) || 1920,
        height: Number(process.env.VIEWPORT_HEIGHT) || 1080
    },
    retries: Number(process.env.RETRIES) || 2
}); 