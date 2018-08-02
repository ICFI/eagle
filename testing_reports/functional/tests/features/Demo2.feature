Feature:
  As a user I need to be able to enter my start and end date and see how many days my task will take to complete.

  Background:
    Given I am on the application page.

  Scenario: Start Date
    When I have entered a Start Date
      And I have entered an End Date
      And I have clicked submit
    Then I expect the Start Date to be Less than or Equal to the End Date.

  Scenario: End Date
    When I have entered a Start Date
      And I have entered an End Date
      And I have clicked submit
    Then I expect the End Date to be Greater than or Equal to the Start Date.

  Scenario: Calculation
    When I have entered a Start Date
      And I have entered an End Date
      And I have clicked submit
    Then I expect to see a whole number result.

  Scenario: Same Day
    When I have entered a Start Date
      And I have entered an End Date
      And Both dates are the same
      And I have clicked submit
    Then I expect to see a result of '0'

  @validation
  Scenario: Date Format
    When I have entered a Date
      And I have clicked submit
    Then I expect the Date to be formated as 'DD/MM/YYYY'

  @validation
  Scenario Outline: Error Messages
    When I have entered a bad value as a '<date>'
      And I have clicked submit
    Then I expect to see '<errorMsg>'
    Examples:
    |date|errorMsg|
    |foo|'Not a valid date'|
    |02/30/2018|'Not a valid date'|
    |30/12/2018|'Bad Date Format'|




