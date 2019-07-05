import i18next from 'i18next';
import Lisk from '@liskhq/lisk-client';
import { loginType } from '../../constants/hwConstants';
import { voteWithHW } from '../../utils/api/hwWallet';
import { splitVotesIntoRounds } from '../voting';

export const getDelegates = (liskAPIClient, options) => liskAPIClient.delegates.get(options);

const voteWithPassphrase = (
  liskAPIClient,
  passphrase,
  votes,
  unvotes,
  secondPassphrase,
  timeOffset,
) => (
  Promise.all(splitVotesIntoRounds({
    votes: [...votes],
    unvotes: [...unvotes],
  }).map(({ votes, unvotes }) => { // eslint-disable-line no-shadow
    const transaction = Lisk.transaction.castVotes({
      votes,
      unvotes,
      passphrase,
      secondPassphrase,
      timeOffset,
    });
    return new Promise((resolve, reject) => {
      liskAPIClient.transactions.broadcast(transaction)
        .then(() => resolve(transaction)).catch(reject);
    });
  }))
);

export const castVotes = async ({
  liskAPIClient,
  account,
  votedList,
  unvotedList,
  secondPassphrase,
  timeOffset,
}) => {
  switch (account.loginType) {
    case loginType.normal:
      return voteWithPassphrase(
        liskAPIClient, account.passphrase,
        votedList, unvotedList, secondPassphrase, timeOffset,
      );
    case loginType.ledger:
      return voteWithHW(liskAPIClient, account, votedList, unvotedList);
    default:
      return new Promise((resolve, reject) => {
        reject(i18next.t('Login Type not recognized.'));
      });
  }
};

export const getVotes = (liskAPIClient, { address }) =>
  liskAPIClient.votes.get({ address, limit: 101, offset: 0 });

export const registerDelegate = (
  liskAPIClient,
  username,
  passphrase,
  secondPassphrase = null,
  timeOffset,
) => {
  const data = { username, passphrase, timeOffset };
  if (secondPassphrase) {
    data.secondPassphrase = secondPassphrase;
  }
  return new Promise((resolve, reject) => {
    const transaction = Lisk.transaction.registerDelegate({ ...data });
    liskAPIClient.transactions
      .broadcast(transaction)
      .then(() => {
        resolve(transaction);
      })
      .catch(reject);
  });
};