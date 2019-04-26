import Lisk from 'lisk-elements';

import { getAPIClient } from './network';
import { tokenMap } from '../../constants/tokens';

describe('Utils: network API', () => {
  describe('getAPIClient', () => {
    let APIClientBackup;
    let constructorSpy;

    beforeEach(() => {
      constructorSpy = jest.fn();
      // TODO: find a better way of mocking Lisk.APIClient
      APIClientBackup = Lisk.APIClient;
      Lisk.APIClient = class MockAPIClient {
        constructor(...args) {
          constructorSpy(...args);
        }
      };
      Lisk.APIClient.constants = APIClientBackup.constants;
      localStorage.setItem('btc', true);
    });

    afterEach(() => {
      Lisk.APIClient = APIClientBackup;
      localStorage.removeItem('btc');
    });

    it('should create a new Lisk APIClient instance if called with LSK token', () => {
      const nethash = Lisk.APIClient.constants.MAINNET_NETHASH;
      const nodeUrl = 'https://hub23.lisk.io';
      const state = {
        network: {
          [tokenMap.LSK.key]: {
            nethash,
            nodeUrl,
          },
        },
      };
      getAPIClient(tokenMap.LSK.key, state);
      expect(constructorSpy).toHaveBeenCalledWith([nodeUrl], { nethash });
    });
  });
});
