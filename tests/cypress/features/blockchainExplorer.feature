Feature: BlockchainExplore
  Background:
    Given I login as genesis on customNode
    And I wait 2 seconds
    Given I am on applications page

  @basic
  Scenario: visit blockchain applications page
    Then blockchain applications list should be accurately rendered
    Then blockchain applications statistics should be accurately rendered
    When I toggle pin button for chain id: ij239sksf5u4jdq8szo3pnsq
    Then chain with id: ij239sksf5u4jdq8szo3pnsq should be pinned
    When I toggle pin button for chain id: ij239sksf5u4jdq8szo3pnsq
    And I wait 0.5 seconds
    Then chain with id: ij239sksf5u4jdq8szo3pnsq should be unpinned

  @basic
  Scenario: visit blockchain application details
    Given I click on chainRow
    Then blockchain details should be accurately displayed
    When I click on chainDetailsPinButton
    Then chain with id: ij239sksf5u4jdq8szo3pnsq should be pinned
    When I click on closeDialog
    Then blockchain details should not be displayed
