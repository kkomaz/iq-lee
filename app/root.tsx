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

const BASE_URL = 'https://incentiveiq.com';

export function meta() {
  const title = 'IncentiveIQ - Earn Rewards for Your Contributions';
  const description =
    'Discover exciting rewards and opportunities with IncentiveIQ';
  const url = BASE_URL;
  const image = `${BASE_URL}/og-image.jpg`;

  return [
    { title },
    { name: 'description', content: description },
    {
      tagName: 'link',
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
    {
      tagName: 'link',
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
}

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
        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 py-6">
          <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-sm">
            <div className="mb-4 sm:mb-0">itskkoma © 2025</div>
            <div className="flex items-center gap-1">
              <span>Made with 💚 by</span>
              <a
                href="https://twitter.com/itskkoma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                @itskkoma
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
