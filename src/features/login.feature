Feature: Login Functionality
  As a user
  I want to login to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "testuser"
    And I enter password "password123"
    And I click the login button
    Then I should be logged in successfully 



  @web
  Scenario: [Web] Sell From Real with auto rejection lower limit
    Given User login to securities using "TRANSACTION" account