const blockchainApplicationsExplore = [
  {
    name: 'Test app',
    chainID: 'aq02qkbb35u4jdq8szo3pnsq',
    state: 'active',
    apis: [{ rest: 'https://service.testappone.com', rpc: 'wss://service.testappone.com' }],
    address: 'lsk24cd35u4jdq8szo3pnsqe5dsxwrnazyqqqg5eu',
    lastCertificateHeight: 1000,
    lastUpdated: 123456789,
    depositedLsk: 50000000,
  },
  {
    name: 'Test app 2',
    chainID: 'ij239sksf5u4jdq8szo3pnsq',
    state: 'active',
    apis: [
      { rest: 'https://service.testapptwo.com', rpc: 'wss://service.testapptwo.com' },
      { rest: 'https://testnet.testapptwo.com', rpc: 'wss://testnet.testapptwo.com' },
    ],
    address: 'lsk24cd35u4jdq8ssd03pnsqe5dsxwrnazyqqqg5eu',
    lastCertificateHeight: 900,
    lastUpdated: 123456789,
    depositedLsk: 500000000,
  },
];

export default blockchainApplicationsExplore;
