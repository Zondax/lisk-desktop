import i18next from 'i18next';
import networks, { networkKeys } from '@network/configuration/networks';

export const getNetworksList = () =>
  Object.values(networkKeys)
    .map(name => ({
      label: i18next.t(networks[name].label),
      name,
    }));

// Return mainnet as back off network name when cache/local storage does not exists
export const getNetworkName = network => network.name || networkKeys.mainNet;

/**
 * Returns human readable error messages
 *
 * @param {Object} error
 * @param {String} error.message - The error message received from network API call
 * @returns {String} - The human readable error message.
 */
export const getConnectionErrorMessage = error => (
  error && error.message
    ? i18next.t(`Unable to connect to the node, Error: ${error.message}`)
    : i18next.t('Unable to connect to the node, no response from the server.')
);
