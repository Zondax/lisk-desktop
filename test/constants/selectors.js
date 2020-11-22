const delegatesPage = {
  totalVotingNumber: '.total-voting-number',
  startVotingButton: '.start-voting-button',
  addedVotesCount: '.added-votes-count',
  removedVotesCount: '.removed-votes-count',
  goToConfirmationButton: '.go-to-confirmation-button',
  votingHeader: '.voting-header',
};
const secondPassphraseRegistrationPage = {
  goToConfirmation: '.go-to-confirmation',
  confirmationCheckbox: '.confirmation-checkbox',
  goToWallet: '.go-to-wallet',
};

const ss = {
  ...delegatesPage,
  ...secondPassphraseRegistrationPage,
  becomeDelegateLink: '.register-delegate',
  app: '#app',
  monitorNetwork: '#network',
  monitorTransactions: '#transactions',
  monitorBlocks: '#blocks',
  monitorAccounts: '#accounts',
  monitorDelegates: '#delegates',
  monitorVoting: '#voting',
  transactionsTable: '.transaction-results',
  transactionRow: '.transactions-row',
  filterAll: '.filter-all',
  filterOutgoing: '.filter-out',
  filterIncoming: '.filter-in',
  filterVoted: '.filter-voted',
  filterNotVoted: '.filter-not-voted',
  seeAllTxsBtn: '.view-all',
  txDetailsBackButton: '.transaction-details-back-button',
  recipientInput: '.recipient input',
  recipientConfirmLabel: '.recipient-confirm',
  transferSendTab: '.send-tab',
  transferRequestTab: '.request-tab',
  requestSpecificAmountBtn: '.specify-request',
  confirmRequestBtn: '.confirm-request',
  qrCode: '.qr-code',
  requestQrCode: '.qrcode-section',
  confirmRequestBlock: '.confirm-request-step',
  requestLink: '.request-link',
  backButton: '.back',
  walletTab: 'li[data-value=\'Wallet\']',
  votesTab: 'li[data-id=\'votes\']',
  delegateStatisticsTab: '.delegate-statistics ',
  votedAddress: '.votes .voter-address',
  voteRow: '.vote-row',
  accountAddress: '.account-address',
  showMoreVotesBtn: '.votes-tab .load-more',
  leftBlockAccountExplorer: '.explorer-account-left-block',
  amountInput: '.amount input',
  bookmarkInput: '#bookmark-input',
  bookmarkList: '.bookmarkList',
  nextTransferBtn: '.send-next-button',
  sendButton: '.confirm-button',
  transactionAddress: '.transaction-address span',
  chooseDelegateName: '.confirm-btn',
  delegateNameInput: '.select-name-input',
  submitDelagateNameBtn: '.submit-delegate-name',
  successText: '.success-description',
  goToDashboardAfterDelegateReg: '.registration-success',
  confirmDelegateRegBtn: '.confirm-delegate-registration',
  spinner: '.spinner',
  transactionReference: '.transaction-reference',
  transactionAmount: '.transaction-amount',
  transactionAmountPlaceholder: '.transaction-amount',
  delegateFeedbackError: '.input-feedback',
  activeAccount: '.active-info',
  accountBalance: '.balance-value',
  nextBtn: '.next',
  txHeader: '.tx-header',
  txSenderAddress: '.sender-address',
  txRecipientAddress: '.receiver-address',
  txDatePlaceholder: '.tx-date',
  txDate: '.tx-date .date',
  txTime: '.tx-time .time',
  txAddedVotes: '.tx-added-votes .voter-address',
  txRemovedVotes: '.tx-removed-votes .voter-address',
  txAmount: '.tx-amount',
  txFee: '.tx-fee span',
  txConfirmations: '.tx-confirmation',
  txId: '.tx-id .copy-title',
  txReference: '.tx-reference',
  delegateResults: '.delegates-result',
  transactionResults: '.transactions-result',
  recentSearches: '.addresses-result',
  idResults: '.addresses-result',
  closeSearchBtn: '.autosuggest-btn-close',
  searchNoResultMessage: '.no-result-message',
  transactionId: '.transaction-id .copy-title',
  logoutBtn: '.logoutBtn',
  userAccount: '.user-account',
  lskToken: '.token-selector-LSK',
  btcToken: '.token-selector-BTC',
  emptyResultsMessage: '.empty-message',
  revealCheckbox: '.reveal-checkbox',
  passphraseTextarea: 'textarea.passphrase',
  itsSafeBtn: '.yes-its-safe-button',
  passphraseWordHolder: '.passphrase-holder label',
  getToDashboardBtn: '.get-to-your-dashboard-button',
  confirmCheckbox: '.confirm-checkbox',
  settingsBtn: '#settings',
  registerSecondPassphraseBtn: '.register-second-passphrase',
  secondPassphraseIsRegisteredLabel: '.second-passphrase-registered',
  secondPassphraseSettingsSection: '.second-passphrase',
  currencySelect: '.currency input',
  currencyOptions: '.currency .option',
  autoLogoutTrigger: '.autoLog',
  switchNetworksTrigger: '.showNetwork',
  messageInput: 'textarea',
  resulteBtn: '.result',
  topBarMenuWalletBtn: '#wallet',
  referenceInput: '.reference input',
  referenceTextarea: '.reference textarea',
  referenceConfirmLabel: '.reference',
  convertorElement: '.convertor',
  convertedPrice: '.converted-price',
  secondPassphraseInput: '.second-passphrase input',
  secondPassphraseNextBtn: '.second-passphrase-next',
  resultMessage: '.result-box-message',
  okayButton: '.okay-button',
  initializeBanner: '.initialize-banner',
  accountInitializationMsg: '.account-initialization',
  accountInitializationBtn: '.account-init-button',
  sidebarMenuDelegatesBtn: '#delegates',
  confirmBtn: '.confirm',
  delegateRow: '.delegate-row',
  delegateList: '.delegate-list',
  delegateRank: '.delegate-rank',
  delegateName: '.delegate-name',
  accountName: '.account-primary',
  accountLabel: '.account-label',
  delegateId: '.delegate-id',
  delegateProductivity: '.delegate-productivity',
  searchDelegateInput: 'input.search',
  voteCheckbox: '.vote-checkbox',
  clearSearchBtn: '.clean-icon',
  addBookmarkAccountButton: '.add-account-button',
  bookmarkAccountItem: '.bookmark-account',
  titleInput: '.account-title input',
  bookmarkAccountBalance: '.bookmark-balance',
  sidebarMenuHelpBtn: '#help',
  createLiskIdBtn: '.new-account-button',
  passphraseInput: '.passphrase input',
  loginBtn: '.login-button',
  networkDropdown: '.network',
  networkOptions: '.network-dropdown .options > *',
  addressInput: '.address input',
  headerAddress: '.copy-title',
  nodeAddress: '.peer',
  networkStatus: '.network-status',
  errorPopup: '.toast',
  newsFeed: '.newsFeed-box',
  newsBlock: '.news-item',
  editNewsFeed: '.settingsButton',
  settingsNewsFeedBlock: '.settingsNewsFeed',
  getPassphraseButton: '.get-passphrase-button',
  editBookmarkAccounts: '.edit-accounts',
  removeBookmarkAccount: '.remove-account',
  bookmarkAccount: '.bookmark-list-row',
  bookmarkAccountTitle: '.account-title input',
  tutorialTooltip: '.joyride-tooltip__header',
  priceChart: '.chartjs-size-monitor',
  transactionRequestButton: '.tx-receive-bt',
  transactionSendButton: '.tx-send-bt',
  bookmarks: '.bookmarks',
  addToBookmarks: '.add-to-bookmarks',
  confirmAddToBookmarks: '.bookmark-button',
  delegateStatsUptime: '.productivity',
  delegateStatsRank: '.rank',
  delegateStatsApproval: '.approval',
  delegateStatsWeight: '.vote',
  delegateStatsForged: '.forged',
  delegateStatsBlocks: '.blocks',
  delegateStatsLastBlock: '.last-forged',
  delegateStatsSince: '.delegate-since',
  bookmarkAccountBtn: '.bookmark-account-button',
  bookmarkedAccountTitle: '.transactions .account-title',
  showMoreButton: '.transaction-results .load-more',
  chooseAvatar: '.choose-avatar span',
  copyPassphrase: '.passphrase .word',
  passphraseWordConfirm: '.word-options .option',
  passphraseConfirmButton: 'button.confirm',
  exploreAsGuestBtn: '.explore-as-guest-button',
  walletOnboarding: '.wallet-onboarding',
  walletOnboardingClose: '.wallet-onboarding .banner-close',
  requestDropdown: '.request-dropdown',
  termsOfUse: '.accept-terms',
  searchIcon: '.search-icon',
  searchInput: '.search-input',
  searchAccountRow: '.account-row',
  searchAccountRowTitle: '.account-title',
  searchTransactionRowId: '.transaction-id',
  searchDelegatesRow: '.delegates-row',
  searchMessage: '.search-bar-feedback',
  searchDelegetesResults: '.delegates-content',
  searchAccountResults: '.account-content',
  searchTransactionRow: '.search-transaction-row',
  transactionDetailsID: '.copy-title',
  submittedTransactionMessage: '.body-message',
  sendReferenceText: '.message',
  summaryAmount: '.amount-summary',
  sendFormAmountFeedback: '.amount-feedback',
  sendBookmarkList: '.bookmark-list li',
  filterTransactionsBtn: '.filterTransactions',
  filterDropdown: '.filter-container',
  dateFromInputFilter: '.dateFromInput',
  dateToInputFilter: '.dateToInput',
  amountFromInputFilter: '.amountFromInput',
  amountToInputFilter: '.amountToInput',
  messageInputFilter: 'input.message',
  applyFilters: '.saveButton',
  filterBar: '.filterBar',
  filter: '.filter',
  clearFilterBtn: '.clear-filter',
  clearAllFiltersBtn: '.clear-all-filters',
  balanceChart: 'chartjs-render-monitor',
  navigationBtnBack: '.go-back',
  navigationBtnForward: '.go-forward',
  termsOfUseLink: '.terms-of-use',
  connectButton: '.connect-button',
  walletHeader: '.wallet-header',
  toast: '.toast',
  confirmButton: '.confirm-button',
  coinRow: '.coin-row',
  closeOnboardingButton: '.closeOnboarding',
  goBack: '.go-back',
  sendLink: '.open-send-dialog',
  closeDialog: '.dialog-close-button',
  bookmarkListToggle: '.bookmark-list-toggle',
  settingsMenu: '.settings-toggle',
  lowFeeOption: '.option-Low',
  mediumFeeOption: '.option-Medium',
  highFeeOption: '.option-High',
  customFeeOption: '.option-Custom',
  customFeeInput: '.custom-fee-input',
  openAddVoteDialog: '.open-add-vote-dialog',
  votingQueueToggle: '.voting-queue-toggle',
  openUnlockBalanceDialog: '.open-unlock-balance-dialog',
  unlockBtn: '.unlock-btn',
  removeVote: '.remove-vote',
  unlockingBalance: '.unlocking-balance',
  addBookmarkIcon: '.add-bookmark-icon',
  inputLabel: '.input-label',
  saveButton: '.save-button',
  feeValue: '.fee-value',
};

export default ss;
