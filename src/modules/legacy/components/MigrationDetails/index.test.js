import React from 'react';
import { mount } from 'enzyme';
import { truncateAddress } from '@wallet/utils/account';
import wallets from '@tests/constants/wallets';
import MigrationDetails from './index';

describe('MigrationDetails component', () => {
  const props = {
    wallet: wallets.empty_wallet,
    showBalance: true,
  };

  it('should render properly', () => {
    const wrapper = mount(<MigrationDetails {...props} />);
    const html = wrapper.html();
    expect(html).toContain(wallets.empty_wallet.legacy.address);
    expect(html).toContain(truncateAddress(wallets.empty_wallet.summary.address, 'medium'));
    expect(html).toContain('98,970,000 LSK');
  });

  it('should not render balance', () => {
    const wrapper = mount(<MigrationDetails {...props} showBalance={false} />);
    const html = wrapper.html();
    expect(html).toContain(wallets.empty_wallet.legacy.address, 'medium');
    expect(html).toContain(truncateAddress(wallets.empty_wallet.summary.address, 'medium'));
  });
});
