import React from 'react';
import TransactionResult from '@shared/transactionResult';
import { getTransactionStatus } from '@shared/transactionResult/statusConfig';
import statusMessages from './statusMessages';
import styles from './status.css';

const Status = ({ transactions, account, t }) => {
  const status = getTransactionStatus(account, transactions);
  const template = statusMessages(t)[status.code];

  return (
    <div className={`${styles.wrapper} status-container`}>
      <TransactionResult
        illustration="default"
        status={status}
        title={template.title}
        message={template.message}
        className={styles.content}
      />
    </div>
  );
};

const areEqual = (prev, next) => (
  !next.account.dpos.delegate
  || prev.account.dpos.delegate.username === next.account.dpos.delegate.username
);

export default React.memo(Status, areEqual);
