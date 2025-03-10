import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectSearchParamValue,
  removeSearchParamsFromUrl,
} from 'src/utils/searchParams';
import { tokenMap } from '@token/fungible/consts/tokens';
import { toRawLsk, fromRawLsk } from '@token/fungible/utils/lsk';
import Dialog from 'src/theme/dialog/dialog';
import Box from 'src/theme/box';
import BoxContent from 'src/theme/box/content';
import BoxFooter from 'src/theme/box/footer';
import BoxHeader from 'src/theme/box/header';
import BoxInfoText from 'src/theme/box/infoText';
import AmountField from 'src/modules/common/components/amountField';
import TokenAmount from '@token/fungible/components/tokenAmount';
import Converter from 'src/modules/common/components/converter';
import WarnPunishedDelegate from '@dpos/validator/components/WarnPunishedDelegate';
import { PrimaryButton, WarningButton } from 'src/theme/buttons';
import useVoteAmountField from '../../hooks/useVoteAmountField';
import getMaxAmount from '../../utils/getMaxAmount';
import styles from './editVote.css';

const getTitles = (t) => ({
  edit: {
    title: t('Edit vote'),
    description: t(
      'Increase or decrease your vote amount, or remove your vote from this delegate. Your updated vote will be added to the voting queue.',
    ),
  },
  add: {
    title: t('Add vote'),
    description: t(
      'Insert a vote amount for this delegate. Your new vote will be added to the voting queue.',
    ),
  },
});

// eslint-disable-next-line max-statements
const EditVote = ({
  history, t, currentHeight, wallet, network, voting, voteEdited,
}) => {
  const [address, start, end] = selectSearchParamValue(history.location.search, ['address', 'start', 'end']);
  const existingVote = useSelector((state) => state.voting[address || wallet.summary.address]);
  const [voteAmount, setVoteAmount] = useVoteAmountField(
    existingVote ? fromRawLsk(existingVote.unconfirmed) : '',
  );
  const mode = existingVote ? 'edit' : 'add';
  const [maxAmount, setMaxAmount] = useState(0);
  useEffect(() => {
    getMaxAmount(wallet, network, voting, address || wallet.summary.address).then(
      setMaxAmount,
    );
  }, [wallet, voting]);

  const confirm = () => {
    voteEdited([
      {
        address: address || wallet.summary.address,
        amount: toRawLsk(voteAmount.value),
      },
    ]);

    removeSearchParamsFromUrl(history, ['modal']);
  };

  const titles = getTitles(t)[mode];

  const removeVote = () => {
    voteEdited([
      {
        address: address || wallet.summary.address,
        amount: 0,
      },
    ]);

    removeSearchParamsFromUrl(history, ['modal']);
  };

  // 6: blocks per minute, 60: minutes, 24: hours
  const numOfBlockPerDay = 24 * 60 * 6;
  const daysLeft = Math.ceil(
    (parseInt(end, 10) - currentHeight) / numOfBlockPerDay,
  );

  return (
    <Dialog hasClose className={styles.wrapper}>
      <Box>
        <BoxHeader>
          <h1>{titles.title}</h1>
        </BoxHeader>
        <BoxContent className={styles.noPadding}>
          <BoxInfoText>
            <span>{titles.description}</span>
          </BoxInfoText>
          <BoxInfoText className={styles.walletInfo}>
            <p className={styles.balanceTitle}>
              {t('Available balance for voting')}
            </p>
            <div className={styles.balanceDetails}>
              <span className={styles.lskValue}>
                <TokenAmount val={maxAmount} token={tokenMap.LSK.key} />
              </span>
              <Converter
                className={styles.fiatValue}
                value={fromRawLsk(maxAmount)}
                error=""
              />
            </div>
          </BoxInfoText>
          {daysLeft >= 1 && start !== undefined && (
            <>
              <WarnPunishedDelegate pomHeight={{ start, end }} vote />
              <span className={styles.space} />
            </>
          )}
          <label className={styles.fieldGroup}>
            <AmountField
              amount={voteAmount}
              onChange={setVoteAmount}
              maxAmount={{ value: maxAmount }}
              displayConverter
              label={t('Vote amount (LSK)')}
              labelClassname={`${styles.fieldLabel}`}
              placeholder={t('Insert vote amount')}
              useMaxLabel={t('Use maximum amount')}
              useMaxWarning={t(
                'Caution! You are about to send the majority of your balance',
              )}
              name="vote"
            />
          </label>
        </BoxContent>
        <BoxFooter direction="horizontal">
          {mode === 'edit' && (
            <WarningButton className="remove-vote" onClick={removeVote}>
              {t('Remove vote')}
            </WarningButton>
          )}
          <PrimaryButton
            className={`${styles.confirmButton} confirm`}
            onClick={confirm}
            disabled={voteAmount.error}
          >
            {t('Confirm')}
          </PrimaryButton>
        </BoxFooter>
      </Box>
    </Dialog>
  );
};

export default EditVote;
