import { olderBlocksRetrieved } from 'src/redux/actions';
import { blockSubscribe, blockUnsubscribe } from '@block/utils';
import actionTypes from '@network/store/actionTypes';
import middleware from './middleware';

jest.mock('@block/utils');
jest.mock('@dpos/validator/api');
jest.mock('@block/store/action');

describe('Block middleware', () => {
  it('Should subscribe to block/change when actionTypes.networkConfigSet', () => {
    const state = {
      blocks: { latestBlocks: [1] },
      network: {},
    };
    const store = {
      dispatch: jest.fn(),
      getState: () => state,
    };
    const action = {
      type: actionTypes.networkConfigSet,
    };

    blockSubscribe.mockImplementation(() => {});
    blockUnsubscribe.mockImplementation(() => {});
    middleware(store)(() => {})(action);

    expect(blockSubscribe).toHaveBeenCalledTimes(1);
    expect(blockUnsubscribe).toHaveBeenCalledTimes(1);
    expect(olderBlocksRetrieved).toHaveBeenCalledTimes(1);
  });
});
