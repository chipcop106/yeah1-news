import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react';
import theme from '@/styles/theme';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

const Chakra = ({ cookies, children }) => {
  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager;
  return (
    <ChakraProvider colorModeManager={colorModeManager} resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
};

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props as any;
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Chakra cookies={pageProps.cookies}>
      <>
        <Head>
          <></>
        </Head>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </>
    </Chakra>
  );
};

MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  // Pass the data to our page via props
  return await App.getInitialProps(ctx);
};

export function getServerSideProps({ req }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
}

export default MyApp;
