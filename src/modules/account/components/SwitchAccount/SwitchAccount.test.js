import mockSavedAccounts from '@tests/fixtures/accounts';
import { OutlineButton } from 'src/theme/buttons';
import { mountWithRouter } from 'src/utils/testHelpers';
import AccountRow from '../AccountRow';
import SwitchAccount from './SwitchAccount';

jest.mock('@account/hooks/useAccounts', () => ({
  useAccounts: jest.fn().mockReturnValue([mockSavedAccounts]),
}));

jest.mock('react-i18next');
jest.mock('@account/hooks', () => ({
  useAccounts: jest.fn(() => ({
    accounts: mockSavedAccounts,
  })),
  useCurrentAccount: jest.fn(() => (
    [mockSavedAccounts[0], jest.fn()]
  )),
}));

describe('Switch account', () => {
  it('Should render properly', () => {
    const wrapper = mountWithRouter(SwitchAccount);

    expect(wrapper.find(AccountRow)).toHaveLength(mockSavedAccounts.length);
    expect(wrapper.find(AccountRow).first()).toHaveText(`${mockSavedAccounts[0].metadata.name}${mockSavedAccounts[0].metadata.address}`);
    expect(wrapper.find(OutlineButton).first()).toHaveText('Add another account');
  });
});
