import { Page } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { createConfig } from '../../../config/Config';

// Mock the Page class
jest.mock('@playwright/test', () => ({
  Page: jest.fn().mockImplementation(() => ({
    goto: jest.fn(),
    fill: jest.fn(),
    click: jest.fn(),
    waitForLoadState: jest.fn(),
    waitForSelector: jest.fn(),
    locator: jest.fn().mockReturnValue({
      isVisible: jest.fn().mockResolvedValue(true),
      textContent: jest.fn().mockResolvedValue('Welcome')
    })
  }))
}));

describe('LoginPage', () => {
  let loginPage: LoginPage;
  let mockPage: jest.Mocked<Page>;
  const config = createConfig();

  beforeEach(() => {
    mockPage = new (jest.requireMock('@playwright/test').Page)() as jest.Mocked<Page>;
    loginPage = new LoginPage(mockPage);
  });

  describe('navigate', () => {
    it('should navigate to the login page', async () => {
      await loginPage.navigate(config);
      expect(mockPage.goto).toHaveBeenCalledWith(config.baseUrl);
    });
  });

  describe('login', () => {
    it('should login with username and password', async () => {
      const username = 'testuser';
      const password = 'testpass';
      
      await loginPage.login(username, password);
      
      expect(mockPage.fill).toHaveBeenCalledWith('#username', username);
      expect(mockPage.fill).toHaveBeenCalledWith('#password', password);
    });

    it('should click login button when no credentials provided', async () => {
      await loginPage.login('', '');
      expect(mockPage.click).toHaveBeenCalledWith('#login-button');
    });
  });

  describe('LoginSecurites', () => {
    it('should login to securities with username and password', async () => {
      const username = 'testuser';
      const password = 'testpass';
      
      await loginPage.LoginSecurites(username, password);
      
      expect(mockPage.waitForSelector).toHaveBeenCalledWith('xpath=//h1[text()=\'Investasi Saham Bersama\']', { timeout: 3000, state: 'visible' });
      expect(mockPage.click).toHaveBeenCalledWith('[data-cy="landing-login-button"]');
      expect(mockPage.fill).toHaveBeenCalledWith('#username', username);
      expect(mockPage.fill).toHaveBeenCalledWith('#password', password);
      expect(mockPage.click).toHaveBeenCalledWith('#email-login-button');
    });
  });

  describe('getWelcomeMessage', () => {
    it('should return welcome message locator', () => {
      const welcomeMessage = loginPage.getWelcomeMessage();
      expect(mockPage.locator).toHaveBeenCalledWith('.welcome-message');
      expect(welcomeMessage).toBeDefined();
    });
  });
}); 