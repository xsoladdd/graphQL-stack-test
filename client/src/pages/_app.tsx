import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../Providers/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Project Locale</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
export default MyApp;