const { resolve } = require('path');

module.exports = {
  rootDir: '../',
  modulePaths: ['packages'],
  testMatch: [
    '<rootDir>/src/**/*.test.js',
    '<rootDir>/app/src/**/*.test.js',
    '<rootDir>/setup/**/*.test.js',
    '<rootDir>/tests/**/*.test.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/test/integration/wallet.test.js',
    'src/components/login/*.test.js',
    'src/components/newsFeed/index.test.js', // This component doesn't meet the setted tresholds for mocha but in jest
    'packages/views/screens/register/register.test.js',
    'packages/views/screens/delegates/votingSummary/voteUrlProcessor/index.test.js',
    'packages/views/screens/register/register.test.js',
    'packages/views/shared/header/signInHeader/signInHeader.test.js',
  ],
  verbose: false,
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^src(.*)$': resolve(__dirname, '../src/$1'),
    '^@scripts(.*)$': resolve(__dirname, '../scripts/$1'),
    '^@setup(.*)$': resolve(__dirname, '../setup/$1'),
    '^@tests(.*)$': resolve(__dirname, '../tests/$1'),
    '^@fixtures(.*)$': resolve(__dirname, '../tests/fixtures/$1'),
    '^@block(.*)$': resolve(__dirname, '../src/modules/block/$1'),
    '^@bookmark(.*)$': resolve(__dirname, '../src/modules/bookmark/$1'),
    '^@common(.*)$': resolve(__dirname, '../packages/common/$1'),
    '^@legacy(.*)$': resolve(__dirname, '../src/modules/legacy/$1'),
    '^@dpos(.*)$': resolve(__dirname, '../src/modules/dpos/$1'),
    '^@network(.*)$': resolve(__dirname, '../packages/network/$1'),
    '^@settings(.*)$': resolve(__dirname, '../packages/settings/$1'),
    '^@token(.*)$': resolve(__dirname, '../packages/token/$1'),
    '^@transaction(.*)$': resolve(__dirname, '../src/modules/transaction/$1'),
    '^@updater(.*)$': resolve(__dirname, '../packages/updater/$1'),
    '^@wallet(.*)$': resolve(__dirname, '../packages/wallet/$1'),
    '^@views(.*)$': resolve(__dirname, '../packages/views/$1'),
    '^@screens(.*)$': resolve(__dirname, '../packages/views/screens/$1'),
    '^@shared(.*)$': resolve(__dirname, '../packages/views/shared/$1'),
    '^@basics(.*)$': resolve(__dirname, '../packages/views/basics/$1'),
    '^@libs(.*)$': resolve(__dirname, '../libs/$1'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  collectCoverageFrom: ['packages/**/*.js', 'setup/**/*.js', 'app/src/**/*.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.test.js',
    '.stories.js',
    'app/src/ipc.js',
    'app/src/ledger.js',
    'app/src/utils.js',
    'app/src/hwManager.js',
    'app/src/trezor.js',
    'app/src/modules/win.js',
    'app/src/modules/localeHandler.js',
    'app/src/modules/storage.js',
    'src/utils/testHelpers.js',
    'src/constants/',
    'scripts/i18n/i18n-scanner.js',
    'setup/react/main.js',
    'tests/tests.js',
    'app/src/modules/autoUpdater.js',
    'src/store/index.js',
    'src/store/reducers/settings.js',
    'src/store/reducers/bookmarks.js',
    'src/store/reducers/network.js',
    'src/store/reducers/filters.js', // To be removed in #2175
    'src/store/middlewares/network.js',
    'src/store/middlewares/account.js',
    'packages/views/screens/',
    'packages/views/shared/errorBoundary/index.js',
    'packages/views/shared/registerMultiStep/index.js',
    'packages/views/shared/registerMultiStep/element.js',
    'packages/views/shared/registerMultiStep/utils.js',
    'packages/views/shared/registerMultiStep/navigator.js',
    'packages/views/shared/registerMultiStep/navigatorButton.js',
    'packages/views/basics/dialog/holder.js',
    'packages/views/basics/dialog/link.js',
    'packages/settings/setters/networkSelector/networkSelector.js',
    'packages/views/shared/customRoute/index.js',
    'packages/views/shared/navigationBars/topBar/topBar.js',
    'packages/views/shared/navigationBars/sideBar/index.js',
    'packages/views/shared/navigationBars/topBar/navigationButtons.js',
    'packages/views/shared/newReleaseDialog/index.js',
    'packages/views/shared/transactionInfo/',
    'packages/views/shared/formattedNumber/stories.js',
    'packages/views/shared/header/signInHeader/signInHeader.js',
    'packages/views/shared/walletVisualWithAddress/index.js',
    'packages/views/shared/voteWeight/index.js',
    'packages/views/shared/transactionTypeFigure/index.js',
    'packages/views/shared/filterDropdownButton/textFilter.js',
    'packages/views/shared/transactionAmount/index.js',
    'packages/views/shared/searchBar/transactions.js',
    'packages/views/shared/navigationBars/topBar/networkName.js',
    'packages/views/shared/multisignatureMembers/index.js',
    'src/modules/dpos/validator/components/WarnPunishedDelegate/warnPunishedDelegate.js',
    'src/modules/dpos/validator/components/WarnPunishedDelegate/index.js',
    'src/modules/dpos/validator/components/WarnPunishedDelegate/voteWarning.js',
    'packages/views/basics/tabsContainer/tabsContainer.js',
    'packages/views/basics/copyToClipboard/index.js',
    'packages/views/basics/dropdown/toolBoxDropdown.js',
    'packages/views/basics/switcher/index.js',
    'packages/views/basics/demo.js',
    'packages/views/basics/calendar/demo.js',
    'packages/views/basics/illustration/demo.js',
    'packages/views/basics/onboarding/demo.js',
    'packages/views/basics/passphraseInput/demo.js',
    'packages/views/basics/spinner/demo.js',
    'packages/views/basics/switcher/demo.js',
    'packages/views/basics/demoRenderer.js',
    'packages/views/basics/table/empty.js',
    'packages/views/basics/table/header.js',
    'packages/views/basics/timestamp/index.js',
    'packages/common/utilities/localJSONStorage.js',
    'packages/common/utilities/analytics.js',
    'src/utils/bookmarks.js',
    'src/utils/api/ledger.js',
    'src/utils/api/btc/',
    'src/utils/api/delegates.js',
    'src/utils/api/lsk/adapters.js',
    'src/utils/api/lsk/account.js',
    'src/utils/applyDeviceClass.js',
    'src/utils/ledger.js',
    'packages/views/utilities/theme.js',
    'packages/common/utilities/balanceChart.js', // This should be unskipped in issue #1499
    'src/utils/loading.js',
    'packages/common/utilities/platform.js',
    'packages/wallet/utilities/hwManager/index.js',
    'packages/common/utilities/api/ws.js',
    'src/utils/account.js',
    'packages/views/configuration/dateTime.js',
    'src/hooks/useServiceSocketUpdates.js',
    'packages/common/utilities/api/apiClient.js',
    'packages/transaction/api/btc.js',
    'packages/common/utilities/api/network/lsk.js',
    'packages/common/utilities/api/network/btc.js',
    'packages/common/utilities/api/market/index.js',
    'packages/views/shared/walletDetails/walletDetails.js',
    'packages/common/utilities/login.js',
    'packages/views/shared/transactionResult/index.js',
    'packages/common/utilities/api/search/lsk.js',
    'packages/common/utilities/api/search/btc.js',
    'packages/wallet/api/btc.js',
    'packages/settings/setters/toggles/toggle.js',
    'packages/settings/setters/toggles/tokenSelector.js',
    'src/store/middlewares/block.js',
    'packages/network/utilities/getNetwork.js',
    'src/modules/block/api/index.js',
    'packages/transaction/api/lsk.js',
    'src/utils/transaction.js',
    'packages/views/shared/filterDropdownButton/addressFilter.js',
    'packages/views/shared/transactionsTable/transactionRow.js',
    'src/store/selectors.js',
    'packages/views/shared/transactionSummary/index.js',
    'packages/views/screens/router/routes.js',
    'packages/common/store/selectors.js',
    'src/modules/dpos/store/reducers/voting.js',
    'src/utils/voting.js',
    'packages/views/shared/transactionResult/illustrations.js',
    'packages/views/shared/transactionResult/regular.js',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'app/src/**/*.js': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'packages/**/*.js': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'packages/**/store/**/*.js': {
      statements: 90,
    },
  },
  setupFiles: ['<rootDir>/setup/config/setupJest.js', 'jest-canvas-mock'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg|png|jpg|jpeg$': '<rootDir>/tests/__mocks__/imageTransform.js',
  },
  testURL: 'http://localhost',
  globals: {
    PRODUCTION: true,
    TEST: true,
    VERSION: '',
  },
  coverageReporters: process.env.ON_JENKINS
    ? ['text', 'lcov', 'cobertura']
    : ['html', 'json'],
  reporters: [
    'default',
    [
      'jest-junit',
      { suiteName: 'jest tests', outputDirectory: '<rootDir>/coverage/jest' },
    ],
  ],
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
  testEnvironment: 'enzyme',
  watchPlugins: [
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    'jest-watch-typeahead/filename',
  ],
};
