import { keyCodes } from 'src/utils/keyCodes';
import { mountWithRouter } from 'src/utils/testHelpers';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let wrapper;

  const props = {
    t: v => v,
    history: {
      push: jest.fn(),
      location: { search: '' },
    },
    suggestions: {
      data: {
        addresses: [],
        transactions: [],
        delegates: [],
        blocks: [],
      },
      loadData: jest.fn(),
      clearData: jest.fn(),
    },
    setSearchBarRef: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mountWithRouter(SearchBar, props);
  });

  it('should render properly SearchBar', () => {
    expect(wrapper).toContainMatchingElement('.search-bar');
    expect(wrapper).toContainMatchingElement('.search-input');
    expect(wrapper).not.toContainMatchingElement('.loading');
  });

  it('should render accounts data properly based on user data input', () => {
    wrapper.find('.search-input input').at(0).simulate('change', { target: { value: '123456L' } });
    jest.advanceTimersByTime(500);
    wrapper.update();
    expect(props.suggestions.loadData).toBeCalled();

    wrapper.find('.search-input input').at(0).simulate('change', { target: { value: '12' } });
    jest.advanceTimersByTime(500);
    wrapper.update();
    expect(props.suggestions.clearData).toBeCalled();
  });

  it('should redirect to a different page if user do a click on selected row for address', () => {
    wrapper.find('.search-input input').at(0).simulate('change', { target: { value: '123456L' } });
    jest.advanceTimersByTime(500);
    wrapper.update();
    expect(props.suggestions.loadData).toBeCalled();

    const newProps = {
      ...props,
      suggestions: {
        ...props.suggestions,
        data: {
          ...props.suggestions.data,
          addresses: [
            {
              summary: {
                address: '123456L',
                title: 'John',
                balance: '120',
              },
            },
          ],
        },
      },
    };
    wrapper = mountWithRouter(SearchBar, newProps);
    wrapper.find('.account-row').at(0).simulate('click');
    expect(props.history.push).toBeCalled();
    expect(props.suggestions.clearData).toBeCalled();
  });

  it('should redirect to a different page if user do a click on selected row for transaction', () => {
    wrapper.find('.search-input input').at(0).simulate('change', { target: { value: '123456123234234' } });
    jest.advanceTimersByTime(500);
    wrapper.update();
    expect(props.suggestions.loadData).toBeCalled();

    const newProps = {
      ...props,
      suggestions: {
        ...props.suggestions,
        data: {
          ...props.suggestions.data,
          transactions: [
            {
              params: {
                data: 'testing',
              },
              id: '123456123234234',
              moduleCommandID: '2:0',
            },
          ],
        },
      },
    };
    wrapper = mountWithRouter(SearchBar, newProps);
    wrapper.find('.search-transaction-row').at(0).simulate('click');
    expect(props.history.push).toBeCalled();
    expect(props.suggestions.clearData).toBeCalled();
  });

  it('should redirect to a delegate page if user do a click on selected row for delegates', () => {
    wrapper.find('.search-input input').at(0).simulate('change', { target: { value: 'genesis' } });
    jest.advanceTimersByTime(500);
    wrapper.update();
    expect(props.suggestions.loadData).toBeCalled();
    const newProps = {
      ...props,
      suggestions: {
        ...props.suggestions,
        data: {
          ...props.suggestions.data,
          delegates: [
            {
              summary: {
                address: '123456L',
              },
              dpos: {
                delegate: {
                  username: 'genesis_10',
                  rank: 34,
                  rewards: 23423,
                  vote: 123,
                },
              },
            },
            {
              summary: {
                address: '123457L',
              },
              dpos: {
                delegate: {
                  username: 'genesis_101',
                  rank: 26,
                  rewards: 23421,
                  vote: 127,
                },
              },
            },
          ],
        },
      },
    };
    wrapper = mountWithRouter(SearchBar, newProps);

    wrapper.find('.search-input input').simulate('keyDown', { keyCode: keyCodes.arrowDown });
    wrapper.find('.search-input input').simulate('keyDown', { keyCode: keyCodes.arrowUp });
    wrapper.find('.search-input input').simulate('keyDown', { keyCode: keyCodes.enter });
    expect(props.suggestions.clearData).toBeCalled();
  });
});
