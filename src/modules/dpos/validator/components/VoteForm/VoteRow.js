import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { tokenMap } from '@token/fungible/consts/tokens';
import { voteEdited } from 'src/redux/actions';
import { fromRawLsk, toRawLsk } from '@token/fungible/utils/lsk';
import { truncateAddress } from '@wallet/utils/account';
import WalletVisual from '@wallet/components/walletVisual';
import Box from '@theme/box';
import { SecondaryButton, TertiaryButton } from '@theme/buttons';
import Icon from '@theme/Icon';
import TokenAmount from '@token/fungible/components/tokenAmount';
import AmountField from 'src/modules/common/components/amountField';
import useVoteAmountField from '../../hooks/useVoteAmountField';
import styles from './voteForm.css';

const ComponentState = Object.freeze({ editing: 1, notEditing: 2 });
const token = tokenMap.LSK.key;

const VoteRow = ({
  t = (s) => s,
  data: {
    address, username, confirmed, unconfirmed,
  },
}) => {
  const [state, setState] = useState(
    unconfirmed === '' ? ComponentState.editing : ComponentState.notEditing,
  );
  const dispatch = useDispatch();
  const [voteAmount, setVoteAmount] = useVoteAmountField(
    fromRawLsk(unconfirmed),
  );
  const truncatedAddress = truncateAddress(address);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    dispatch(
      voteEdited([
        {
          address,
          amount: toRawLsk(voteAmount.value),
        },
      ]),
    );
    setState(ComponentState.notEditing);
  };

  const discard = () => {
    dispatch(
      voteEdited([
        {
          address,
          amount: confirmed,
        },
      ]),
    );
  };

  const changeToEditingMode = () => {
    setState(ComponentState.editing);
  };

  const changeToNotEditingMode = () => {
    setState(ComponentState.notEditing);
  };

  return (
    <Box className={styles.voteItemContainer}>
      <div className={`${styles.infoColumn} ${styles.delegateInfoContainer}`}>
        <WalletVisual address={address} />
        <div className={styles.delegateInfo}>
          <span className={styles.delegateUsername}>{username || ''}</span>
          <span className={styles.delegateAddress}>{truncatedAddress}</span>
        </div>
      </div>
      <span className={`${styles.oldAmountColumn} ${styles.centerContent}`}>
        {confirmed ? <TokenAmount val={confirmed} token={token} /> : '-'}
      </span>
      {state === ComponentState.notEditing ? (
        <>
          <span className={`${styles.newAmountColumn} ${styles.centerContent}`}>
            {unconfirmed ? <TokenAmount val={unconfirmed} token={token} /> : '-'}
          </span>
          <div
            className={`${styles.editIconsContainer} ${styles.centerContent}`}
          >
            <span onClick={changeToEditingMode}>
              <Icon name="edit" className={styles.editIcon} />
            </span>
            <span onClick={discard}>
              <Icon name="deleteIcon" className={styles.editIcon} />
            </span>
          </div>
        </>
      ) : (
        <form
          className={`${styles.editVoteForm} ${styles.centerContent}`}
          onSubmit={handleFormSubmission}
        >
          <AmountField
            amount={voteAmount}
            onChange={setVoteAmount}
            displayConverter={false}
            placeHolder={t('Vote amount')}
            className={styles.editAmountInput}
            name="vote"
          />
          <div className={styles.formButtonsContainer}>
            <SecondaryButton
              size="s"
              className={styles.formButtons}
              onClick={changeToNotEditingMode}
            >
              {t('Cancel')}
            </SecondaryButton>
            <TertiaryButton
              size="s"
              className={styles.formButtons}
              onClick={handleFormSubmission}
            >
              {t('Save')}
            </TertiaryButton>
          </div>
        </form>
      )}
    </Box>
  );
};

export default VoteRow;
