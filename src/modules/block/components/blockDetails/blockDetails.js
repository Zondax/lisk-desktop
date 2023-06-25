import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import routes from 'src/routes/routes';
import { tokenMap } from '@token/fungible/consts/tokens';
import DateTimeFromTimestamp from 'src/modules/common/components/timestamp';
import Box from 'src/theme/box';
import BoxHeader from 'src/theme/box/header';
import BoxContent from 'src/theme/box/content';
import CopyToClipboard from 'src/modules/common/components/copyToClipboard';
import Feedback from 'src/theme/feedback/feedback';
import LabeledValue from 'src/theme/labeledValue';
import TokenAmount from '@token/fungible/components/tokenAmount';
import Transactions from '@transaction/components/BlockDetailsTransactions';
import { truncateAddress } from '@wallet/utils/account';
import WalletVisual from '@wallet/components/walletVisual';
import styles from './blockDetails.css';

const Generator = ({ generatorAddress, generatorUsername }) => {
  if (generatorUsername && generatorAddress) {
    return (
      <Link
        className={styles.generator}
        to={`${routes.explorer.path}?address=${generatorAddress}`}
      >
        <WalletVisual
          className={styles.avatar}
          address={generatorAddress}
          size={30}
        />
        <span>{generatorUsername}</span>
      </Link>
    );
  }

  return <span>None (Genesis block)</span>;
};

const getFields = (data = {}, token, t, currentHeight) => ({
  id: {
    label: t('Block ID'),
    value: (
      <CopyToClipboard
        text={truncateAddress(data.id)}
        value={data.id}
        className="tx-id"
        containerProps={{
          size: 'xs',
          className: 'copy-title',
        }}
        copyClassName={styles.copyIcon}
      />
    ),
  },
  height: {
    label: t('Height'),
    value: <CopyToClipboard value={data.height} />,
  },
  date: {
    label: t('Date'),
    value: (
      <DateTimeFromTimestamp time={data.timestamp} />
    ),
  },
  confirmations: {
    label: t('Confirmations'),
    value: data.height ? currentHeight - data.height : '-',
  },
  version: {
    label: t('Version'),
    value: data.version,
  },
  generator: {
    label: t('Generated by'),
    value: (
      <Generator
        generatorAddress={data.generatorAddress}
        generatorUsername={data.generatorUsername}
      />
    ),
  },
  totalForged: {
    label: t('Total forged'),
    value: <TokenAmount val={data.totalForged} token={token} />,
  },
  reward: {
    label: t('Reward'),
    value: <TokenAmount val={data.reward} token={token} />,
  },
  totalBurnt: {
    label: t('Total burnt'),
    value: <TokenAmount val={data.totalBurnt} token={token} />,
  },
  totalFee: {
    label: t('Total fee'),
    value: <TokenAmount val={data.totalFee} token={token} />,
  },
});

const Rows = ({ data, t, currentHeight }) => {
  const token = tokenMap.LSK.key;
  const fields = getFields(data, token, t, currentHeight);

  const columns = Object.keys(fields).map((field) => (
    <LabeledValue
      key={field}
      label={fields[field].label}
      className={`${styles.dataRow} block-${field}`}
    >
      {fields[field].value}
    </LabeledValue>
  ));

  return <div className={styles.dataContainer}>{columns}</div>;
};

const BlockDetails = ({
  t, blockDetails, currentHeight, id,
}) => {
  useEffect(() => {
    blockDetails.loadData();
  }, [id]);

  return (
    <div>
      <Box isLoading={blockDetails.isLoading} width="full">
        <BoxHeader>
          <h1>{t('Block details')}</h1>
        </BoxHeader>
        <BoxContent>
          {blockDetails.error ? (
            <Feedback
              message={t('Failed to load block details.')}
              status="error"
            />
          ) : (
            <Rows
              data={blockDetails.data}
              currentHeight={currentHeight}
              t={t}
            />
          )}
        </BoxContent>
      </Box>
      <Transactions blockId={id} />
    </div>
  );
};

export default BlockDetails;