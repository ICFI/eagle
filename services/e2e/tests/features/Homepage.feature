Feature: Homepage
  As a user of the service
  I need to be able to access the site.

  @SmokeTests
  Scenario: Homepage is up
    Given I have gone to the site
    Then I expect to see a webpage.