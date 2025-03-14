/* istanbul ignore file */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import {
  parseSearchParams,
  addSearchParamsToUrl,
} from 'src/utils/searchParams';
import { transactionsRetrieved } from 'src/redux/actions';
import {
  selectAccount,
  selectActiveToken,
  selectSettings,
  selectTransactions,
} from 'src/redux/selectors';
import TabsContainer from 'src/theme/tabs/tabsContainer/tabsContainer';
import Transactions from '@transaction/components/WalletTransactions';
import Overview from '@wallet/components/overview/overview';
import DelegateTab from '@dpos/validator/components/delegateProfile';
import VotesTab from '@wallet/components/votes';

const AccountDetails = ({ t, history }) => {
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  const activeToken = useSelector(selectActiveToken);
  const { discreetMode } = useSelector(selectSettings);
  const { confirmed, pending } = useSelector(selectTransactions);
  const {
    isDelegate,
    address,
    // isMultisignature,
  } = account.info[activeToken].summary;

  useEffect(() => {
    dispatch(transactionsRetrieved({ address }));
  }, [confirmed.length]);

  useEffect(() => {
    const params = parseSearchParams(history.location.search);
    if (params.recipient !== undefined) {
      addSearchParamsToUrl(history, { modal: 'send' });
    }
  }, []);

  return (
    <section>
      <Overview
        isWalletRoute
        activeToken={activeToken}
        discreetMode={discreetMode}
        account={account.info[activeToken]}
        hwInfo={account.hwInfo}
        transactions={confirmed}
      />
      <TabsContainer name="main-tabs">
        <Transactions
          pending={pending || []}
          confirmedLength={confirmed.length}
          activeToken={activeToken}
          discreetMode={discreetMode}
          name={t('Transactions')}
          id="Transactions"
          address={address}
        />
        <VotesTab
          history={history}
          address={address}
          name={t('Votes')}
          id="votes"
        />
        {isDelegate ? (
          <DelegateTab
            tabClassName="delegate-statistics"
            name={t('Delegate profile')}
            id="delegateProfile"
            account={account.info[activeToken]}
          />
        ) : null}
        {/* {isMultisignature
          ? (
            <MultiSignatureTab
              // tabClassName="delegate-statistics"
              name={t('Multisignatures')}
              id="multiSignatures"
            />
          )
          : null} */}
      </TabsContainer>
    </section>
  );
};

export default compose(withRouter, withTranslation())(AccountDetails);
