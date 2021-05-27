import { MODULE_ASSETS_NAME_ID_MAP } from '@constants';

import {
  TransactionId, Sender, Recipient, Message, Illustration,
  Confirmations, Date, Amount, Fee, RequiredSignatures, TransactionVotes,
  BlockId, BlockHeight,
} from './components';
import { Members } from './components/components';
import styles from './transactionDetails.css';

const {
  transfer, voteDelegate, unlockToken, registerDelegate, registerMultisignatureGroup,
  // reclaimLSK,
} = MODULE_ASSETS_NAME_ID_MAP;

const baseComponents = [Sender, Confirmations, TransactionId, Fee, Date, BlockId, BlockHeight];

const LayoutSchema = {
  [transfer]: {
    components: [...baseComponents, Recipient, Illustration, Amount, Message],
    className: '',
  },
  [voteDelegate]: {
    components: [...baseComponents, Illustration, TransactionVotes],
    className: styles.voteLayout,
  },
  [registerDelegate]: {
    components: [...baseComponents, Illustration],
    className: styles.registerDelegate,
  },
  [registerMultisignatureGroup]: {
    components: [...baseComponents, RequiredSignatures, Members],
    className: styles.multiSigLayout,
  },
  [unlockToken]: {
    components: [...baseComponents, Illustration, Amount],
    className: styles.unlockToken,
  },
  default: {
    components: [...baseComponents],
    className: styles.generalLayout,
  },
};

export default LayoutSchema;