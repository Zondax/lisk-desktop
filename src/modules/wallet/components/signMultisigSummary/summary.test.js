import React from 'react';
import { mount } from 'enzyme';
import { MODULE_COMMANDS_NAME_ID_MAP } from '@transaction/configuration/moduleAssets';
import { removeSearchParamsFromUrl } from 'src/utils/searchParams';
import wallets from '@tests/constants/wallets';
import Summary from './summary';

jest.mock('src/utils/searchParams', () => ({
  ...jest.requireActual('src/utils/searchParams'),
  removeSearchParamsFromUrl: jest.fn(),
}));

jest.mock('@transaction/utils/transaction', () => ({
  getTxAmount: () => '1000000000',
}));

describe.skip('Sign Multisignature Tx Review component', () => {
  let wrapper;
  const props = {
    t: v => v,
    transaction: {
      id: '12510531279763703865',
      moduleCommandID: MODULE_COMMANDS_NAME_ID_MAP.transfer,
      nonce: '158',
      sender: {
        address: wallets.multiSig.summary.address,
      },
      fee: '1000000',
      signatures: [
        wallets.multiSig.summary.publicKey,
        '',
        '',
      ],
      params: {
        mandatoryKeys: wallets.multiSig.keys.mandatoryKeys,
        optionalKeys: wallets.multiSig.keys.optionalKeys,
        numberOfSignatures: wallets.multiSig.keys.numberOfSignatures,
        recipient: {
          address: wallets.genesis.summary.address,
        },
      },
    },
    account: wallets.genesis,
    activeToken: 'LSK',
    networkIdentifier: 'sample_identifier',
    nextStep: jest.fn(),
    history: {},
    error: undefined,
    senderAccount: { data: wallets.multiSig },
  };

  beforeEach(() => {
    wrapper = mount(<Summary {...props} />);
  });

  it('Should call props.nextStep passing the signed transaction', () => {
    wrapper = mount(<Summary {...props} />);
    const signatures = props.transaction.signatures;
    signatures[1] = wallets.genesis.summary.publicKey;
    wrapper.find('button.sign').simulate('click');
    expect(props.nextStep).toHaveBeenCalledWith(expect.objectContaining({
      rawTx: expect.anything(),
      sender: expect.anything(),
    }));
  });

  it('Should call props.prevStep', () => {
    wrapper = mount(<Summary {...props} />);
    wrapper.find('button.reject').simulate('click');
    expect(removeSearchParamsFromUrl).toHaveBeenCalledWith(props.history, ['modal']);
  });

  it('Should render properly', () => {
    wrapper = mount(<Summary {...props} />);
    const { params } = props.transaction;
    const expectedLength = params.mandatoryKeys.length + params.optionalKeys.length;
    const html = wrapper.html();
    expect(wrapper).toContainMatchingElements(expectedLength, '.member-info');
    expect(html).toContain('0.01 LSK');
  });

  it('Should render properly when senderAccount.data is empty', () => {
    wrapper = mount(<Summary {...props} senderAccount={{ data: {} }} />);
    const html = wrapper.html();
    expect(html).toEqual('<div></div>');
  });
});
