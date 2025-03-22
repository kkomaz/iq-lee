import { Trophy } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { Link, Form, useActionData } from '@remix-run/react';
import { ActionFunctionArgs } from '@remix-run/node';
import prisma from '~/lib/prisma.server';

export const meta = () => {
  return [
    { title: 'Admin - Campaign Platform' },
    { name: 'description', content: 'Manage your campaigns' },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const longDescription = formData.get('longDescription') as string;
  const expiresAt = formData.get('expiresAt') as string;
  const value = formData.get('value') as string;
  const image = formData.get('image') as string;
  const userId = formData.get('userId') as string;

  if (!title) {
    return new Response(
      JSON.stringify({ error: 'Campaign title is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Upsert user (create if not exists)
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email: 'unknown@example.com' },
  });

  // Create campaign
  await prisma.campaign.create({
    data: {
      title,
      description: description || 'No description provided',
      longDescription: longDescription || 'No extended details provided',
      expiresAt: expiresAt
        ? new Date(expiresAt)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      value: value || '0',
      image: image || 'https://via.placeholder.com/150',
      userId,
    },
  });

  return new Response(JSON.stringify({ success: 'Campaign created!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export default function Admin() {
  const { login, authenticated, user, logout } = usePrivy();
  const actionData = useActionData<{ error?: string; success?: string }>();

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
          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Home
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4 text-white">
        <h2 className="text-2xl font-semibold mb-4">Create a Campaign</h2>
        <Form method="post" className="space-y-4 max-w-lg">
          <input type="hidden" name="userId" value={user?.id} />
          <div>
            <label htmlFor="title" className="block text-slate-300 mb-1">
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter campaign title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-slate-300 mb-1">
              Short Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter short description"
            />
          </div>
          <div>
            <label
              htmlFor="longDescription"
              className="block text-slate-300 mb-1"
            >
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter detailed description"
            />
          </div>
          <div>
            <label htmlFor="expiresAt" className="block text-slate-300 mb-1">
              Expires At
            </label>
            <input
              type="date"
              id="expiresAt"
              name="expiresAt"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="value" className="block text-slate-300 mb-1">
              Value
            </label>
            <input
              type="text"
              id="value"
              name="value"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              placeholder="e.g., 500 per week"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-slate-300 mb-1">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter image URL"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Create Campaign
          </button>
          {actionData?.error && (
            <p className="text-red-400">{actionData.error}</p>
          )}
          {actionData?.success && (
            <p className="text-green-400">{actionData.success}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
