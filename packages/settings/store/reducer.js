import { tokenMap } from '@token/fungible/consts/tokens';
import { deepMergeObj } from '@common/utilities/helpers';
import actionTypes from './actionTypes';

export const channels = {
  academy: false,
  twitter: true,
  blog: false,
  github: false,
  reddit: false,
};

// load setting data from localStorage if it exists and merge with initial state
export const initialState = {
  autoLog: true,
  showNetwork: false,
  channels,
  hardwareAccounts: {},
  isRequestHowItWorksDisable: false,
  statistics: false,
  areTermsOfUseAccepted: false,
  discreetMode: false,
  token: {
    active: tokenMap.LSK.key,
    list: {
      [tokenMap.LSK.key]: true,
    },
  },
  sideBarExpanded: true,
  currency: 'USD',
};

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const settings = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.settingsRetrieved: {
      return {
        ...state,
        ...action.data,
      };
    }
    case actionTypes.settingsUpdated:
      return deepMergeObj(state, action.data);
    case actionTypes.settingsReset:
      return {
        ...state,
        autoLog: true,
      };
    default:
      return state;
  }
};

export default settings;
