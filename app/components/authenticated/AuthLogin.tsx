import React from 'react';
import { Link } from '@remix-run/react';
import { LoginModalOptions } from '@privy-io/react-auth';

interface AuthLogin {
  login: (options?: LoginModalOptions | React.MouseEvent<any, any>) => void;
}

export default function AuthLogin({ login }: AuthLogin) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-800 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
          Access Denied
        </h1>
        <p className="text-slate-300 mb-6">
          You need to log in to access the admin dashboard.
        </p>
        <button
          onClick={login}
          className="bg-[rgb(var(--primary))] text-slate-950 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
        >
          Log In
        </button>
        <p className="mt-4 text-slate-400">
          <Link to="/" className="text-blue-400 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
