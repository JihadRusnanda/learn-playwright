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



  Scenario: [Web] Sell From Real with auto rejection lower limit
    Given User login to securities using "TRANSACTION" account
    # And User clear smart order using api
    # And User cancel all order using api
    # And User get initial info on "JKON" at their portfolio using api
    # When User click portfolio menu
    # And User click sell
    # And User set order lot sell 1
    # And User set price below lower limit Real
    # And User click place order sell
    # And User click "confirm" button in preview order
    # And User click done in popup success order
    # Then User see status order "REJECTED"