import React from 'react';
import { getTxAmount } from '@transaction/utils/transaction';
import DiscreetMode from 'src/modules/common/components/discreetMode';
import TokenAmount from '@token/fungible/components/tokenAmount';
import TransactionDetailsContext from '../../context/transactionDetailsContext';
import ValueAndLabel from './valueAndLabel';
import styles from './styles.css';

const Amount = ({ t }) => {
  const { activeToken, transaction } = React.useContext(
    TransactionDetailsContext,
  );
  const addresses = [
    transaction.params.recipient?.address ?? '',
    transaction.sender.address,
  ];

  return (
    <ValueAndLabel label={t('Amount of transaction')} className={styles.amount}>
      <DiscreetMode addresses={addresses} shouldEvaluateForOtherAccounts>
        <span className="tx-amount">
          <TokenAmount val={getTxAmount(transaction)} />
          {' '}
          {activeToken}
        </span>
      </DiscreetMode>
    </ValueAndLabel>
  );
};

export default Amount;
