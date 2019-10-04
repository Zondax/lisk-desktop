import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { DEFAULT_LIMIT } from '../../../../constants/monitor';
import { DateTimeFromTimestamp } from '../../../toolbox/timestamp';
import BlockFilterDropdown from './blockFilterDropdown';
import Box from '../../../toolbox/box';
import Feedback from '../../../toolbox/feedback/feedback';
import FilterBar from '../../../shared/filterBar';
import LiskAmount from '../../../shared/liskAmount';
import PageLayout from '../../../toolbox/pageLayout';
import TableRow from '../../../toolbox/table/tableRow';
import routes from '../../../../constants/routes';
import styles from './blocks.css';
import useFilters from '../../../../hooks/useFilters';

const columnClassNames = {
  id: `${grid['col-md-2']} ${grid['col-xs-3']}`,
  height: grid['col-xs-2'],
  date: `${grid['col-md-2']} hidden-m`,
  transactions: grid['col-xs-2'],
  generator: grid['col-xs-2'],
  amount: grid['col-xs-1'],
  forged: `${grid['col-md-1']} ${grid['col-xs-2']}`,
};

const Blocks = ({ t, blocks }) => {
  const [filters, applyFilters, clearFilter, clearAllFilters] = useFilters(blocks, {
    dateFrom: '',
    dateTo: '',
    height: '',
    address: '',
  });

  const formatters = {
    height: value => `${t('Height')}: ${value}`,
    address: value => `${t('Generated by')}: ${value}`,
  };

  const handleLoadMore = () => {
    blocks.loadData(Object.keys(filters).reduce((acc, key) => ({
      ...acc,
      ...(filters[key] && { [key]: filters[key] }),
    }), {
      offset: blocks.data.length,
    }));
  };

  return (
    <PageLayout>
      <Box isLoading={blocks.isLoading} width="full" main>
        <Box.Header>
          <h1>{t('All blocks')}</h1>
          <BlockFilterDropdown filters={filters} applyFilters={applyFilters} />
        </Box.Header>
        <FilterBar {...{
          clearFilter, clearAllFilters, filters, formatters, t,
        }}
        />
        { blocks.error
          ? (
            <Box.Content>
              <Feedback status="error" show>{`${blocks.error}`}</Feedback>
            </Box.Content>
          )
          : (
            <React.Fragment>
              <Box.Content className={styles.content}>
                {!!blocks.data.length && (
                <TableRow isHeader className={`${grid.row}`}>
                  <div className={columnClassNames.id}>{t('ID')}</div>
                  <div className={columnClassNames.height}>{t('Height')}</div>
                  <div className={columnClassNames.date}>{t('Date')}</div>
                  <div className={columnClassNames.transactions}>{t('Transactions')}</div>
                  <div className={columnClassNames.generator}>{t('Generated by')}</div>
                  <div className={columnClassNames.amount}>{t('Amount')}</div>
                  <div className={columnClassNames.forged}>{t('Forged')}</div>
                </TableRow>
                )}
                {blocks.data.map(block => (
                  <TableRow key={block.id} className={`${grid.row}`}>
                    <span className={[columnClassNames.id, 'block-id'].join(' ')}>
                      <Link to={`${routes.blocks.path}/${block.id}`}>
                        {block.id}
                      </Link>
                    </span>
                    <span className={columnClassNames.height}>{block.height}</span>
                    <span className={columnClassNames.date}>
                      <DateTimeFromTimestamp time={block.timestamp * 1000} token="BTC" />
                    </span>
                    <span className={columnClassNames.transactions}>
                      {block.numberOfTransactions}
                    </span>
                    <span className={columnClassNames.generator}>
                      <Link to={`${routes.accounts.pathPrefix}${routes.accounts.path}/${block.generatorAddress}`}>
                        {block.generatorUsername}
                      </Link>
                    </span>
                    <span className={columnClassNames.amount}>
                      <LiskAmount val={block.totalAmount} />
            &nbsp;
                      {`${t('LSK')}`}
                    </span>
                    <span className={columnClassNames.forged}>
                      <LiskAmount val={block.totalForged} />
            &nbsp;
                      {`${t('LSK')}`}
                    </span>
                  </TableRow>
                ))}
              </Box.Content>
              {!!blocks.data.length && blocks.data.length % DEFAULT_LIMIT === 0 && (
              <Box.FooterButton
                className="load-more"
                onClick={handleLoadMore}
              >
                {t('Load more')}
              </Box.FooterButton>
              )}
            </React.Fragment>
          )
      }
      </Box>
    </PageLayout>
  );
};

Blocks.propTypes = {
  t: PropTypes.func.isRequired,
  blocks: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Blocks;
