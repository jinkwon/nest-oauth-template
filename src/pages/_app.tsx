import { NextComponentType } from 'next';
import {
  AppContext,
  AppInitialProps,
  AppProps
} from 'next/app';
import '../client/css/index.css';
import React from 'react';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => {

  return <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
    <title>TEMPLATE</title>
    <Component {...pageProps} />
  </>;
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps['member'] = ctx?.req?.['user'];

  return {
    pageProps
  };
};

export default MyApp;
