import { Suspense } from 'react';
import { Outlet } from 'umi';
import { Provider } from 'react-redux'
import { reduxStore, persistor } from '@/Redux';
import Web3ModalProvider from '@/provider/Web3ModalProvider';
import ModalProvider from '@/provider/modalProvider';
import NoticeProvider from '@/provider/NoticeProvider';
import LoadingProvider from '@/provider/loadingProvider';
import { PersistGate } from 'redux-persist/integration/react';
import './index.less'
import 'animate.css'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';

import * as Sentry from "@sentry/browser";


Sentry.init({
  dsn: "https://0d44e4611478f87af0ad3ec4badceada@o4505752206049280.ingest.sentry.io/4506835260801024",

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: "react-n2ft",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});


export default function Layout() {
  return (
    <Suspense fallback={<div/>}>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactQueryProvider>
            <Web3ModalProvider>
              <LoadingProvider>
                <ModalProvider>
                  <NoticeProvider>
                      <Header/>
                      <Outlet />
                    <Footer/>
                  </NoticeProvider>
                </ModalProvider>
              </LoadingProvider>
            </Web3ModalProvider>
          </ReactQueryProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}