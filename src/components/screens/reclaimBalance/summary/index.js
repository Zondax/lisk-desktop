import React from 'react';
import to from 'await-to-js';
import { useSelector } from 'react-redux';
import { selectAccount } from '@store/selectors';
import { create } from '@api/transaction';
import { tokenMap, MODULE_ASSETS_NAME_ID_MAP } from '@constants';
import { useTransactionFeeCalculation, useTransactionPriority } from '@shared/transactionPriority';
import AccountMigration from '@shared/accountMigration';
import TransactionSummary from '@shared/transactionSummary';
import LiskAmount from '@shared/liskAmount';
import { toRawLsk } from '@utils/lsk';

const moduleAssetId = MODULE_ASSETS_NAME_ID_MAP.reclaimLSK;

const Summary = ({
  nextStep,
  t,
}) => {
  const token = tokenMap.LSK.key;
  const account = useSelector(selectAccount);
  const network = useSelector(state => state.network);
  const [
    // eslint-disable-next-line no-unused-vars
    selectedPriority, _, priorityOptions,
  ] = useTransactionPriority(token);
  console.log(selectedPriority, priorityOptions);

  const { minFee } = useTransactionFeeCalculation({
    selectedPriority,
    token,
    account: account.info.LSK,
    priorityOptions,
    transaction: {
      moduleAssetId,
      nonce: account.info.LSK.sequence.nonce,
      senderPublicKey: account.info.LSK.summary.publicKey,
      amount: account.info.LSK.legacy.balance,
    },
  });
  console.log(minFee);

  const onSubmit = async () => {
    const data = {
      moduleAssetId,
      network,
      senderPublicKey: account.info.LSK.summary.publicKey,
      passphrase: account.passphrase,
      nonce: account.info.LSK.sequence.nonce,
      fee: toRawLsk(minFee.value),
      amount: account.info.LSK.legacy.balance,
    };

    console.log('onSubmit', data);

    const [error, tx] = await to(
      create(data, tokenMap.LSK.key),
    );
    console.log(error, tx);

    if (!error) {
      nextStep({ transactionInfo: tx });
    }
  };

  const onConfirmAction = {
    label: t('Continue'),
    onClick: onSubmit,
  };

  return (
    <TransactionSummary
      title={t('Transaction summary')}
      t={t}
      account={account.info.LSK}
      confirmButton={onConfirmAction}
      showCancelButton={false}
      fee={minFee.value}
      token={token}
    >
      <section>
        <AccountMigration account={account.info.LSK} showBalance={false} />
      </section>
      <section>
        <label>{t('Balance to reclaim')}</label>
        <LiskAmount val={parseInt(account.info.LSK.legacy.balance, 10)} token="LSK" />
      </section>
    </TransactionSummary>
  );
};

export default Summary;
