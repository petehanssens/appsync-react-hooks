import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import client from '../ClientSetup'

import '../.semantic/dist/semantic.min.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Container>
            <Component {...pageProps} />
          </Container>
      </ApolloHooksProvider>
    </ApolloProvider>
    );
  }
}

export default MyApp;