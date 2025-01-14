import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import mockSavedAccounts from '@tests/fixtures/accounts';
import { Router } from 'react-router';
import AddAccountOptions from './AddAccountOptions';

jest.mock('react-i18next');
jest.mock('../../hooks/useAccounts', () => ({
  useAccounts: jest.fn().mockReturnValue([mockSavedAccounts]),
}));

const props = {
  history: {
    listen: jest.fn(),
    location: { pathname: '/test' },
    push: jest.fn(),

  },
};

beforeEach(() => {
  render(
    <Router history={props.history}>
      <AddAccountOptions />
    </Router>,
  );
});

describe('Add Account Choice', () => {
  it('Should render the add account choice page', async () => {
    expect(screen.getByText('Add account')).toBeTruthy();
    expect(screen.getByText('Select the applicable mode.')).toBeTruthy();
    expect(screen.getByText('Don’t have a Lisk account yet?')).toBeTruthy();
    expect(screen.getByText('Restore from file')).toBeTruthy();
    expect(screen.getByText('Secret recovery phrase')).toBeTruthy();
  });

  it('should re-direct to /account/add/secrete-recovery', async () => {
    fireEvent.click(screen.getByText('Secret recovery phrase'));
    expect(props.history.push).toBeCalled();
  });

  it('should re-direct to /account/add/add/by-file', async () => {
    fireEvent.click(screen.getByText('Restore from file'));
    expect(props.history.push).toBeCalled();
  });
});
