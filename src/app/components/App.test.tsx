import React from 'react';
import { render, fireEvent, resetStore } from '../../../tests/config/setupTest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    resetStore();
  });

  it('shows loading screen', () => {
    const { getByText } = render(<App />);
    const LodingText = getByText('Loading. please wait');

    expect(LodingText).toBeInTheDocument();
  });

  it('skip to start screen when there is no tokens', () => {
    const { getByText } = render(<App />);
    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          pluginMessage: {
            type: 'tokenvalues',
            status: '',
            values: {
              version: '5',
              usedTokenSet: ['global'],
              themes: [],
              activeTheme: null,
              values: {
                global: [],
              },
            },
          },
        },
      }),
    );
    const WelcomeText = getByText('Welcome to Figma Tokens.');

    expect(WelcomeText).toBeInTheDocument();
  });

  it('skip to token tab when there is a token', () => {
    const { getByText } = render(<App />);
    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          pluginMessage: {
            type: 'tokenvalues',
            status: '',
            values: {
              version: '5',
              usedTokenSet: ['global'],
              themes: [],
              activeTheme: null,
              values: {
                global: [
                  {
                    name: 'size',
                    value: '11',
                    type: 'sizing'
                  }
                ],
              },
            },
          },
        },
      }),
    );
    const TokenText = getByText('size');

    expect(TokenText).toBeInTheDocument();
  });
});
