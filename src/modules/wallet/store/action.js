/* eslint-disable max-lines */
import { to } from 'await-to-js';
import { tokenMap } from '@token/fungible/consts/tokens';
import { MODULE_ASSETS_NAME_ID_MAP } from '@transaction/configuration/moduleAssets';
import { toRawLsk } from '@token/fungible/utils/lsk';
import { isEmpty } from '@common/utilities/helpers';
import { create } from '@transaction/api';
import { getAccount } from '@wallet/utils/api';
import { networkStatusUpdated } from '@network/store/action';
import actionTypes from './actionTypes';

export const accountLoading = () => ({
  type: actionTypes.accountLoading,
});

/**
 * Gets the account info for given addresses of different tokens
 * We have getAccounts functions for retrieving multiple accounts of
 * a single blockchain. This one is for retrieving accounts of
 * different blockchains.
 *
 * @param {Object} data
 * @param {Object} data.network Network config from the Redux store
 * @param {Object} data.params addresses in the form of {[token]: [address]}
 * @returns {Promise<[object]>}
 */
const getAccounts = async ({ network, params }) =>
  Object.keys(params).reduce(async (accountsPromise, token) => {
    const accounts = await accountsPromise;
    const baseUrl = network.networks[token].serviceUrl;
    const account = await getAccount({ network, baseUrl, params: params[token] }, token);
    return {
      ...accounts,
      [token]: account,
    };
  }, Promise.resolve({}));

/**
 * This action is used to update account balance when new block was forged and
 * account middleware detected that it contains a transaction that affects balance
 * of the active account
 *
 * @param {String} tokensTypes - Options of 'enabled' and 'active'
 */
export const accountDataUpdated = tokensTypes =>
  async (dispatch, getState) => {
    const { network, settings, wallet } = getState();

    // Get the list of tokens that are enabled in settings
    const activeTokens = tokensTypes === 'enabled'
      ? Object.keys(settings.token.list)
        .filter(key => settings.token.list[key])
      : [settings.token.active];

    // Collect their addresses to send to the API
    const params = activeTokens.reduce((acc, token) => {
      acc[token] = { publicKey: wallet.info[token].summary.publicKey };
      return acc;
    }, {});

    const [error, info] = await to(getAccounts({ network, params }));

    if (info) {
      // Uninitialized account don't have a public key stored on the blockchain.
      // but we already have it on the Redux store.
      info.LSK.summary.publicKey = wallet.info.LSK.summary.publicKey;
      info.LSK.summary.privateKey = wallet.info.LSK.summary.privateKey;
      dispatch({
        type: actionTypes.accountUpdated,
        data: info,
      });
      dispatch(networkStatusUpdated({ online: true }));
    } else {
      dispatch(networkStatusUpdated({ online: false, code: error.error.code }));
    }
  };

export const multisigGroupRegistered = ({
  fee,
  mandatoryKeys,
  optionalKeys,
  numberOfSignatures,
}) => async (dispatch, getState) => {
  //
  // Collect data
  //
  const state = getState();
  const activeWallet = {
    ...state.wallet.info.LSK,
    hwInfo: isEmpty(state.wallet.hwInfo) ? undefined : state.wallet.hwInfo,
    passphrase: state.wallet.passphrase,
  };

  //
  // Create the transaction
  //
  const [error, tx] = await to(
    create({
      network: state.network,
      wallet: activeWallet,
      transactionObject: {
        mandatoryKeys,
        optionalKeys,
        numberOfSignatures,
        moduleAssetId: MODULE_ASSETS_NAME_ID_MAP.registerMultisignatureGroup,
        fee: toRawLsk(fee),
        nonce: activeWallet.sequence.nonce,
        senderPublicKey: activeWallet.summary.publicKey,
      },
    }, tokenMap.LSK.key),
  );

  //
  // Dispatch corresponding action
  //
  if (!error) {
    dispatch({
      type: actionTypes.transactionCreatedSuccess,
      data: tx,
    });
  } else {
    dispatch({
      type: actionTypes.transactionSignError,
      data: error,
    });
  }
};
