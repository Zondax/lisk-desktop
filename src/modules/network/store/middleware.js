import settings from 'src/modules/settings/const/settingConstants';
import { networkKeys } from '@network/configuration/networks';
import { getAutoLogInData, shouldAutoLogIn } from 'src/utils/login';
import analytics from 'src/utils/analytics';
import settingsActionTypes from 'src/modules/settings/store/actionTypes';
import { login } from '@auth/store/action';
import { settingsUpdated } from 'src/modules/settings/store/actions';
import { networkSelected, networkStatusUpdated, networkConfigSet } from './action';
import actionTypes from './actionTypes';

const readStoredNetwork = ({ dispatch, getState }) => {
  const {
    statistics, statisticsRequest, statisticsFollowingDay, network,
  } = getState().settings;

  const config = network?.name && network?.address
    ? network
    : {
      name: networkKeys.mainNet,
      address: network?.networks?.mainnet?.serviceUrl,
    };
  dispatch(networkSelected(config));
  dispatch(networkStatusUpdated({ online: true }));

  if (!statistics) {
    analytics.checkIfAnalyticsShouldBeDisplayed({
      statisticsRequest, statisticsFollowingDay, statistics,
    });
  }
};

const network = (store) => next => async (action) => {
  next(action);
  switch (action.type) {
    case settingsActionTypes.settingsRetrieved:
      readStoredNetwork(store);
      break;
    case actionTypes.networkSelected: {
      store.dispatch(await networkConfigSet(action.data));
      break;
    }
    case actionTypes.networkConfigSet: {
      const autoLoginData = getAutoLogInData();
      if (shouldAutoLogIn(autoLoginData)) {
        store.dispatch(login({ passphrase: autoLoginData[settings.keys.loginKey] }));
      }
      break;
    }
    case actionTypes.customNetworkStored:
    case actionTypes.customNetworkRemoved:
      store.dispatch(
        settingsUpdated({ storedCustomNetwork: store.getState().network.storedCustomNetwork }),
      );
      break;
    default:
      break;
  }
};

export default network;
