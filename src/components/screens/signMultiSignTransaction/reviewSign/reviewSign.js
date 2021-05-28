import React from 'react';
import { transactions } from '@liskhq/lisk-client';
import { extractAddressFromPublicKey } from '@utils/account';
import Box from '../../../toolbox/box';
import BoxContent from '../../../toolbox/box/content';
import BoxFooter from '../../../toolbox/box/footer';
import { PrimaryButton, SecondaryButton } from '../../../toolbox/buttons';
import MultiSignatureReview from '../../../shared/multiSignatureReview';
import ProgressBar from '../progressBar';
import styles from '../styles.css';
import TransactionDetails from '../../transactionDetails/transactionDetails';

const ReviewSign = ({
  t,
  transaction,
  networkIdentifier,
  account,
  prevStep,
  nextStep,
}) => (
  <section>
    <Box className={styles.boxContainer}>
      <header>
        <h1>{t('Sign multisignature transaction')}</h1>
        <p>{t('If you have received a multisignature transaction that requires your signature, use this tool to review and sign it.')}</p>
      </header>
      <BoxContent>
        <ProgressBar current={2} />
        <TransactionDetails
          t={t}
          activeToken="LSK"
          schema={`${transaction.moduleAssetId}-preview`}
          account={account}
          transaction={{
            data: transaction,
            error: false,
            isLoading: false,
          }}
        />
      </BoxContent>
    </Box>
  </section>
);
export default ReviewSign;
