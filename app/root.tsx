import React from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { PrivyProvider } from '@privy-io/react-auth';
import styles from './tailwind.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

// Loader function to pass environment variables to the client
export const loader: LoaderFunction = async () => {
  return json({
    PRIVY_ID: process.env.PRIVY_ID,
  });
};
export default function App() {
  const { PRIVY_ID } = useLoaderData<{ PRIVY_ID: string }>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PrivyProvider
          appId={PRIVY_ID}
          config={{
            loginMethods: ['email'], // Just email for you
            appearance: { theme: 'light' }, // Light theme (optional)
          }}
        >
          <Outlet /> {/* This renders your pages */}
        </PrivyProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
