import { withTranslation } from 'react-i18next';
import React from 'react';
import { sizeOfString } from '../../../../utils/helpers';
import AccountInfo from './accountInfo';
import BoxRow from '../../../toolbox/box/row';
import TransactionTypeFigure from '../../../shared/transactionTypeFigure';
import TransactionVotes from './transactionVotes';
import styles from './transactionDetailView.css';
import transactionTypes from '../../../../constants/transactionTypes';


function getDelegateName(transaction, activeToken) {
  return (activeToken === 'LSK'
    && transaction.asset
    && transaction.asset.delegate
    && transaction.asset.delegate.username) ? transaction.asset.delegate.username : null;
}

const getTxAsset = (tx) => {
  if (typeof tx.asset === 'object' && tx.asset !== null && typeof tx.asset.data === 'string') {
    return tx.asset.data;
  }
  return '-';
};

class TransactionDetailView extends React.Component {
  render() {
    const {
      transaction,
      children,
      activeToken,
      netCode,
      t,
    } = this.props;
    const { senderLabel, title } = transactionTypes.getByCode(transaction.type || 0);
    const isTransferTransaction = transaction.type === transactionTypes().send.code;
    return (transaction.id ? (
      <React.Fragment>
        { isTransferTransaction
          ? null
          : (
            <div className={styles.summaryHeader}>
              <TransactionTypeFigure
                address={transaction.senderId}
                transactionType={transaction.type}
              />
              <h2 className="tx-header">{title}</h2>
            </div>
          )
        }
        <BoxRow className={styles.detailsWrapper}>
          <AccountInfo
            name={getDelegateName(transaction, activeToken)}
            token={activeToken}
            netCode={netCode}
            address={transaction.senderId}
            addressClass="sender-address"
            label={senderLabel}
          />
        </BoxRow>
        { isTransferTransaction
          ? (
            <BoxRow className={styles.detailsWrapper}>
              <AccountInfo
                token={activeToken}
                netCode={netCode}
                address={transaction.recipientId}
                addressClass="receiver-address"
                label={t('Recipient')}
              />
            </BoxRow>
          )
          : null
        }
        {children}
        { isTransferTransaction && activeToken === 'LSK'
          ? (
            <BoxRow className={styles.message}>
              <div className={`${styles.detailsWrapper}`}>
                <span className={styles.label}>{t('Message')}</span>
                <div className={`${styles.value} tx-reference`}>
                  {getTxAsset(transaction)}
                </div>
              </div>
              <div className={`${styles.detailsWrapper}`}>
                <span className={styles.label}>{t('Size')}</span>
                <div className={`${styles.value} tx-size`}>
                  {`${sizeOfString(transaction.asset.data)} bytes`}
                </div>
              </div>
            </BoxRow>
          ) : null
        }
        { !isTransferTransaction && transaction.votesName ? (
          <TransactionVotes votes={transaction.votesName} />
        ) : null
        }
      </React.Fragment>
    ) : null);
  }
}

TransactionDetailView.defaultProps = {
  children: null,
};

export default withTranslation()(TransactionDetailView);