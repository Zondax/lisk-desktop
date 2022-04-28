import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  calculateBalanceLockedInVotes,
  calculateUnlockableBalance,
  getActiveTokenAccount,
  getUnlockableUnlockObjects,
} from '@wallet/utilities/account';
import { MODULE_ASSETS_NAME_ID_MAP } from '@transaction/configuration/moduleAssets';
import TransactionPriority, { useTransactionFeeCalculation } from '@transaction/components/transactionPriority';
import useTransactionPriority from '@transaction/hooks/useTransactionPriority';
import { selectCurrentBlockHeight } from '@common/store/selectors';
import Form from './form';
import BalanceTable from './balanceTable';

const moduleAssetId = MODULE_ASSETS_NAME_ID_MAP.unlockToken;

const LockedBalance = (props) => {
  const wallet = useSelector(state => getActiveTokenAccount(state));
  const token = useSelector(state => state.settings.token.active);
  const network = useSelector(state => state.network);
  const currentBlockHeight = useSelector(selectCurrentBlockHeight);
  const lockedInVotes = useSelector(state => calculateBalanceLockedInVotes(state.voting));
  const unlockableBalance = calculateUnlockableBalance(
    wallet.dpos?.unlocking, currentBlockHeight,
  );
  const [customFee, setCustomFee] = useState();
  const [
    selectedPriority, selectTransactionPriority,
    priorityOptions, prioritiesLoadError, loadingPriorities,
  ] = useTransactionPriority(token);

  const { fee, minFee } = useTransactionFeeCalculation({
    network,
    selectedPriority,
    token,
    wallet,
    priorityOptions,
    transaction: {
      moduleAssetId,
      senderPublicKey: wallet.summary?.publicKey,
      nonce: wallet.sequence?.nonce,
      passphrase: wallet.passphrase,
      unlockObjects: getUnlockableUnlockObjects(wallet.dpos?.unlocking, currentBlockHeight),
    },
  });

  return (
    <Form
      data={{
        customFee,
        fee,
        unlockableBalance,
      }}
      {...props}
    >
      <BalanceTable
        lockedInVotes={lockedInVotes}
        unlockableBalance={unlockableBalance}
        currentBlockHeight={currentBlockHeight}
        account={wallet}
      />
      <TransactionPriority
        token={token}
        fee={fee}
        minFee={Number(minFee.value)}
        customFee={customFee ? customFee.value : undefined}
        moduleAssetId={moduleAssetId}
        setCustomFee={setCustomFee}
        priorityOptions={priorityOptions}
        selectedPriority={selectedPriority.selectedIndex}
        setSelectedPriority={selectTransactionPriority}
        loadError={prioritiesLoadError}
        isLoading={loadingPriorities}
      />
    </Form>
  );
};

export default LockedBalance;
