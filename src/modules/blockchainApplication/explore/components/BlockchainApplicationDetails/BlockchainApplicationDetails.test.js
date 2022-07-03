import moment from 'moment';
import { fireEvent, screen } from '@testing-library/react';
import mockBlockchainApplications from '@tests/fixtures/blockchainApplications';
import { renderWithRouter } from 'src/utils/testHelpers';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';
import BlockchainApplicationDetails from '.';

const mockedPins = ['1111'];
const mockTogglePin = jest.fn();

jest.mock('../../hooks/usePinBlockchainApplication');

usePinBlockchainApplication.mockReturnValue({
  togglePin: mockTogglePin,
  pins: mockedPins,
  checkPinByChainId: jest.fn().mockReturnValue(true),
});

describe('BlockchainApplicationDetails', () => {
  const props = {
    location: {
      search: 'chainId=test-chain-id',
    },
    application: {
      data: mockBlockchainApplications[0],
      isLoading: true,
      loadData: jest.fn(),
      error: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    renderWithRouter(BlockchainApplicationDetails, props);
  });

  it('should display properly', () => {
    const {
      name, address, state, lastCertificateHeight, lastUpdated,
    } = mockBlockchainApplications[0];

    expect(screen.getByText(name)).toBeTruthy();
    expect(screen.getByText(address)).toBeTruthy();
    expect(screen.getByText(state)).toBeTruthy();
    expect(screen.getByText(lastCertificateHeight)).toBeTruthy();
    expect(screen.getByText(moment(lastUpdated).format('DD MMM YYYY'))).toBeTruthy();

    expect(screen.getByText('Chain ID')).toBeTruthy();
    expect(screen.getByText('Status')).toBeTruthy();
    expect(screen.getByText('Last Update')).toBeTruthy();
    expect(screen.getByText('Last Certificate Height')).toBeTruthy();
    expect(screen.getByText('Deposited:')).toBeTruthy();
  });

  it('should show application as pinned', () => {
    expect(screen.getByAltText('pinnedIcon')).toBeTruthy();
  });

  it('should show application as unpinned', () => {
    usePinBlockchainApplication.mockReturnValue(
      {
        togglePin: mockTogglePin,
        pins: mockedPins,
        checkPinByChainId: jest.fn().mockReturnValue(false),
      },
    );

    renderWithRouter(BlockchainApplicationDetails, props);
    expect(screen.getByAltText('unpinnedIcon')).toBeTruthy();
  });
});
