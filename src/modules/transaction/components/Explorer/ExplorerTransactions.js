import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentBlockHeight } from 'src/redux/selectors';
import Box from 'src/theme/box';
import BoxHeader from 'src/theme/box/header';
import BoxContent from 'src/theme/box/content';
import Table from 'src/theme/table';
import FilterBar from 'src/modules/common/components/filterBar';
import TransactionRow from '../TransactionRow';
import styles from './ExplorerTransactions.css';
import header from './ExplorerTransactionsHeaderMap';
import FilterDropdown from '../FilterDropdown';

const Transactions = ({
  pending,
  transactions,
  activeToken,
  filters,
  applyFilters,
  changeSort,
  sort,
  clearFilter,
  clearAllFilters,
  t,
  votedDelegates,
  address,
  confirmedLength,
}) => {
  const currentBlockHeight = useSelector(selectCurrentBlockHeight);
  useEffect(() => {
    // This will automatically load the new data too.
    clearAllFilters();
  }, [activeToken]);

  useEffect(() => {
    const addressList = transactions.data.data
      && transactions.data.data.reduce((acc, data) => {
        if (data.title === 'vote') {
          const votesList = data.params.votes || [];
          const dataAddresses = votesList.map((vote) => vote.delegateAddress);
          return acc.concat(dataAddresses);
        }
        return acc;
      }, []);
    if (addressList.length > 0) {
      votedDelegates.loadData({ addressList });
    }
  }, [transactions.data.data]);

  useEffect(() => {
    transactions.loadData();
  }, [pending.length, confirmedLength, address]);

  /* istanbul ignore next */
  const handleLoadMore = () => {
    transactions.loadData({
      offset: transactions.data.meta.count + transactions.data.meta.offset,
      sort,
      ...filters,
    });
  };

  const canLoadMore = transactions.data.meta
    ? transactions.data.meta.total
      > transactions.data.meta.count + transactions.data.meta.offset
    : false;

  const formatters = {
    dateFrom: (value) => `${t('From')}: ${value}`,
    dateTo: (value) => `${t('To')}: ${value}`,
    amountFrom: (value) => `> ${value} ${activeToken}`,
    amountTo: (value) => `< ${value} ${activeToken}`,
  };

  return (
    <Box
      main
      isLoading={transactions.isLoading}
      className={`${styles.wrapper} transactions-box`}
    >
      <BoxHeader>
        <FilterDropdown
          filters={filters}
          applyFilters={(f) => applyFilters({ ...f, address })}
        />
      </BoxHeader>
      <FilterBar
        {...{
          clearFilter,
          clearAllFilters,
          filters,
          formatters,
          t,
        }}
      />
      <BoxContent className={`${styles.content} transaction-results`}>
        <Table
          data={pending.concat(transactions.data.data)}
          isLoading={transactions.isLoading}
          row={TransactionRow}
          loadData={handleLoadMore}
          additionalRowProps={{
            activeToken,
            host: address,
            delegates: votedDelegates.data,
            currentBlockHeight,
            layout: 'hosted',
            avatarSize: 40,
          }}
          header={header(t, activeToken, changeSort)}
          currentSort={sort}
          canLoadMore={canLoadMore}
          error={
            transactions.error.code !== 404 ? transactions.error : undefined
          }
          emptyState={{
            message: t('This account does not have any transactions.'),
          }}
        />
      </BoxContent>
    </Box>
  );
};

export default Transactions;
