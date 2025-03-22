import { Trophy } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { Link } from '@remix-run/react';

export const meta = () => {
  return [
    { title: 'Admin - Campaign Platform' },
    { name: 'description', content: 'Manage your campaigns' },
  ];
};

export default function Admin() {
  const { login, authenticated, user, logout } = usePrivy();

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-300 mb-6">
            You need to log in to view the admin page.
          </p>
          <button
            onClick={login}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
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

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[rgb(var(--primary))]" />
            <span className="text-xl text-white font-bold">
              Admin Dashboard
            </span>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </nav>
      <div className="container mx-auto p-4 text-white">
        <p>Welcome, {user?.email?.address || 'Admin'}!</p>
        <p>This is your protected admin page.</p>
      </div>
    </div>
  );
}
