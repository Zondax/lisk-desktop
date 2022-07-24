const blockchainApplicationsManage = [
  {
    name: 'Lisk',
    chainID: 'aq02qkbb35u4jdq8szo3pnsq',
    state: 'active',
    serviceURLs: ['https://service.lisk.com'],
    address: 'lsk24cd35u49jd8szo3pnsqe5dsxwrnazyqqqg5eu',
    lastUpdated: 123456789,
    lastCertificateHeight: 9000,
    isDefault: true,
  },
  {
    name: 'Colecti',
    chainID: 'mi34vyyd12g2lkf0rza1irws',
    state: 'active',
    serviceURLs: ['https://service.colecti.com'],
    address: 'lsk2423d5u4jdq8szo3pnsqe5dsxwrnazyqqqg5eu',
    lastUpdated: 123789456,
    lastCertificateHeight: 1111,
    isDefault: true,
  },
  {
    name: 'Enevti',
    chainID: 'aq86llsb35u4syc8aet7xenf',
    state: 'active',
    serviceURLs: ['https://service.enevti.com'],
    address: 'lsk24cd35u4jdq8szo3pnsqe5dsxwrnazvftqg5eu',
    lastCertificateHeight: 700,
    lastUpdated: 456123789,
    isDefault: true,
  },
  {
    name: 'DoEdu',
    chainID: 'aq96eeqk77r4syc8aet9fcey',
    state: 'terminated',
    serviceURLs: ['https://service.doedu.com'],
    address: 'lsk24cd35u4jdq8szo3pnsqe5dmdfrnazyqqqg5eu',
    lastUpdated: 789123456,
    lastCertificateHeight: 100,
    isDefault: false,
  },
  {
    name: 'Kalipo',
    chainID: 'aq25derd17a4syc8aet3pryt',
    state: 'active',
    serviceURLs: ['https://service.kalipo.com'],
    address: 'lsk24cd35u4jdq8szo3pnsqe5gb5wrnazyqqqg5eu',
    lastCertificateHeight: 10000,
    lastUpdated: 789456123,
    isDefault: false,
  },
  {
    name: 'Lisk DEX',
    chainID: 'dz38fkbb35u4jdq8szo3pnsq',
    state: 'active',
    serviceURLs: ['https://service.liskdex.com'],
    address: 'lsk24cd35u4fwq8szo3pnsqe5dsxwrnazyqqqg5eu',
    lastCertificateHeight: 900,
    lastUpdated: 123456789,
    isDefault: true,
  },
];

export const applicationsMap = blockchainApplicationsManage.reduce(
  (obj, val) => {
    obj[val.chainID] = val;
    return obj;
  },
  {},
);

export default blockchainApplicationsManage;
