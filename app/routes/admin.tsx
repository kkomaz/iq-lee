import { Trophy, ChevronDown, ChevronUp, Trash2, Pencil } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import {
  Link,
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import prisma from '~/lib/prisma.server';
import { useState } from 'react';
import { redirect } from '@remix-run/node';

export const meta = () => {
  return [
    { title: 'Admin - IncentiveIQ Campaign Platform' },
    { name: 'description', content: 'Create and manage your reward campaigns' },
    {
      tagName: 'link',
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ];
};

// Loader to fetch campaigns and enforce single-user access
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const allowedUserId = process.env.ALLOWED_PRIVY_USER_ID;
  try {
    await prisma.$connect();
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return new Response(JSON.stringify({ campaigns, allowedUserId }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in admin loader:', error);
    throw new Response('Failed to load campaigns. Please try again later.', {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
};

// Action to handle create, update, and delete
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;

  if (intent === 'create') {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const expiresAt = formData.get('expiresAt') as string;
    const value = formData.get('value') as string;
    const totalAmount = parseInt(formData.get('totalAmount') as string) || 0;
    const image = formData.get('image') as string;
    const featured = formData.get('featured') === 'on';
    const isAd = formData.get('isAd') === 'on';
    const isNew = formData.get('isNew') === 'on';
    const userId = formData.get('userId') as string;
    const kaitoUrl = formData.get('kaitoUrl') as string; // New field
    const companyUrl = formData.get('companyUrl') as string; // New field
    const airdropUrl = formData.get('airdropUrl') as string; // New field
    const xUrl = formData.get('xUrl') as string; // New field

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

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: 'unknown@example.com' },
    });

    await prisma.campaign.create({
      data: {
        title,
        description: description || 'No description provided',
        longDescription: longDescription || 'No extended details provided',
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        value: value || '0',
        totalAmount,
        image: image || 'https://via.placeholder.com/150',
        featured,
        isAd,
        isNew,
        userId,
        kaitoUrl: kaitoUrl || null, // New field
        companyUrl: companyUrl || null, // New field
        airdropUrl: airdropUrl || null, // New field
        xUrl: xUrl || null, // New field
      },
    });

    return new Response(JSON.stringify({ success: 'Campaign created!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (intent === 'update') {
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const expiresAt = formData.get('expiresAt') as string;
    const value = formData.get('value') as string;
    const totalAmount = parseInt(formData.get('totalAmount') as string);
    const image = formData.get('image') as string;
    const featured = formData.get('featured') === 'on';
    const isAd = formData.get('isAd') === 'on';
    const isNew = formData.get('isNew') === 'on';
    const kaitoUrl = formData.get('kaitoUrl') as string; // New field
    const companyUrl = formData.get('companyUrl') as string; // New field
    const airdropUrl = formData.get('airdropUrl') as string; // New field
    const xUrl = formData.get('xUrl') as string; // New field

    if (!id || !title) {
      return new Response(
        JSON.stringify({ error: 'ID and title are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await prisma.campaign.update({
      where: { id },
      data: {
        title,
        description: description || 'No description provided',
        longDescription: longDescription || 'No extended details provided',
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        value: value || '0',
        totalAmount,
        image: image || 'https://via.placeholder.com/150',
        featured,
        isAd,
        isNew,
        kaitoUrl: kaitoUrl || null, // New field
        companyUrl: companyUrl || null, // New field
        airdropUrl: airdropUrl || null, // New field
        xUrl: xUrl || null, // New field
      },
    });

    return new Response(JSON.stringify({ success: 'Campaign updated!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (intent === 'delete') {
    const id = parseInt(formData.get('id') as string);
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Campaign ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await prisma.campaign.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: 'Campaign deleted!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Invalid intent' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
};

// Badge component for displaying statuses
function Badge({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}
    >
      {children}
    </span>
  );
}

export function ErrorBoundary({ error }) {
  console.error('Admin ErrorBoundary caught:', error);
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-800 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
          Error
        </h1>
        <p className="text-slate-300 mb-6">{error.message}</p>
        <p className="text-slate-400">
          <Link to="/" className="text-blue-400 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Admin() {
  const { login, authenticated, user, logout } = usePrivy();
  const actionData = useActionData<{ error?: string; success?: string }>();
  const { campaigns, allowedUserId } = useLoaderData<{
    campaigns: any[];
    allowedUserId: string;
  }>();
  const navigation = useNavigation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);

  // Restrict to single user
  if (authenticated && user?.id !== allowedUserId) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-800 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
            Access Denied
          </h1>
          <p className="text-slate-300 mb-6">
            Only one user is allowed to access this application. Contact the
            administrator.
          </p>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  if (!authenticated) {
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

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[rgb(var(--primary))]" />
            <span className="text-2xl text-white font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
              Admin Dashboard
            </span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-white/5 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Home
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
              Manage Campaigns
            </h2>
            <button
              onClick={() => {
                setIsFormOpen(!isFormOpen);
                setEditingCampaign(null); // Reset edit state when toggling
              }}
              className="bg-[rgb(var(--primary))] text-slate-950 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2"
            >
              {isFormOpen ? 'Close Form' : 'New Campaign'}
              {isFormOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Toggleable Form */}
          {isFormOpen && (
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-lg border border-slate-800 shadow-xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
              </h3>
              <Form method="post" className="space-y-6">
                <input type="hidden" name="userId" value={user?.id} />
                {editingCampaign && (
                  <input type="hidden" name="id" value={editingCampaign.id} />
                )}
                <input
                  type="hidden"
                  name="intent"
                  value={editingCampaign ? 'update' : 'create'}
                />
                <div>
                  <label
                    htmlFor="title"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={editingCampaign?.title}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter campaign title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    defaultValue={editingCampaign?.description}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter short description"
                    rows={3}
                  />
                </div>
                <div>
                  <label
                    htmlFor="longDescription"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Long Description
                  </label>
                  <textarea
                    id="longDescription"
                    name="longDescription"
                    defaultValue={editingCampaign?.longDescription}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter detailed description"
                    rows={5}
                  />
                </div>
                <div>
                  <label
                    htmlFor="expiresAt"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Expires At (Optional)
                  </label>
                  <input
                    type="date"
                    id="expiresAt"
                    name="expiresAt"
                    defaultValue={
                      editingCampaign?.expiresAt
                        ? new Date(editingCampaign.expiresAt)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="value"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Value
                  </label>
                  <input
                    type="text"
                    id="value"
                    name="value"
                    defaultValue={editingCampaign?.value}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="e.g., 500 per week"
                  />
                </div>
                <div>
                  <label
                    htmlFor="totalAmount"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Total Amount
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    defaultValue={editingCampaign?.totalAmount || 0}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter total reward amount"
                    min="0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    defaultValue={editingCampaign?.image}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter image URL"
                  />
                </div>
                {/* New Fields */}
                <div>
                  <label
                    htmlFor="kaitoUrl"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Kaito URL (Optional)
                  </label>
                  <input
                    type="text"
                    id="kaitoUrl"
                    name="kaitoUrl"
                    defaultValue={editingCampaign?.kaitoUrl}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter Kaito URL"
                  />
                </div>
                <div>
                  <label
                    htmlFor="companyUrl"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Company URL (Optional)
                  </label>
                  <input
                    type="text"
                    id="companyUrl"
                    name="companyUrl"
                    defaultValue={editingCampaign?.companyUrl}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter Company URL"
                  />
                </div>
                <div>
                  <label
                    htmlFor="airdropUrl"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Airdrop URL (Optional)
                  </label>
                  <input
                    type="text"
                    id="airdropUrl"
                    name="airdropUrl"
                    defaultValue={editingCampaign?.airdropUrl}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter Airdrop URL"
                  />
                </div>
                <div>
                  <label
                    htmlFor="xUrl"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    X URL (Optional)
                  </label>
                  <input
                    type="text"
                    id="xUrl"
                    name="xUrl"
                    defaultValue={editingCampaign?.xUrl}
                    className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
                    placeholder="Enter X URL"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      defaultChecked={editingCampaign?.featured}
                      className="h-5 w-5 text-[rgb(var(--primary))] bg-slate-800/50 border-slate-700 rounded focus:ring-[rgb(var(--primary))] focus:ring-offset-slate-900"
                    />
                    <label
                      htmlFor="featured"
                      className="text-slate-300 text-sm"
                    >
                      Featured
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isAd"
                      name="isAd"
                      defaultChecked={editingCampaign?.isAd}
                      className="h-5 w-5 text-[rgb(var(--primary))] bg-slate-800/50 border-slate-700 rounded focus:ring-[rgb(var(--primary))] focus:ring-offset-slate-900"
                    />
                    <label htmlFor="isAd" className="text-slate-300 text-sm">
                      Is Ad
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isNew"
                      name="isNew"
                      defaultChecked={editingCampaign?.isNew}
                      className="h-5 w-5 text-[rgb(var(--primary))] bg-slate-800/50 border-slate-700 rounded focus:ring-[rgb(var(--primary))] focus:ring-offset-slate-900"
                    />
                    <label htmlFor="isNew" className="text-slate-300 text-sm">
                      Is New
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={navigation.state === 'submitting'}
                  className="w-full bg-[rgb(var(--primary))] text-slate-950 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
                </button>
                {actionData?.error && (
                  <p className="text-red-400 text-sm text-center">
                    {actionData.error}
                  </p>
                )}
                {actionData?.success && (
                  <p className="text-emerald-400 text-sm text-center">
                    {actionData.success}
                  </p>
                )}
              </Form>
            </div>
          )}

          {/* Campaign List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Current Campaigns
            </h3>
            {campaigns.length === 0 ? (
              <p className="text-slate-400 text-center">
                No campaigns yet. Create one to get started!
              </p>
            ) : (
              campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-800 hover:scale-[1.02] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 flex-shrink-0">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-white">
                          {campaign.title}
                        </h4>
                        <div className="flex gap-2">
                          {campaign.featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                              Featured
                            </Badge>
                          )}
                          {campaign.isNew && (
                            <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              New
                            </Badge>
                          )}
                          {campaign.isAd && (
                            <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20">
                              Ad
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-300 line-clamp-1">
                        {campaign.description}
                      </p>
                      <div className="text-sm text-slate-400 mt-2">
                        <span>
                          Expires:{' '}
                          {campaign.expiresAt
                            ? new Date(campaign.expiresAt).toLocaleDateString()
                            : 'No expiration'}
                        </span>{' '}
                        • <span>Value: {campaign.value}</span> •{' '}
                        <span>Total Amount: {campaign.totalAmount}</span>
                      </div>
                      {/* Display New Fields */}
                      <div className="text-sm text-slate-400 mt-1">
                        {campaign.kaitoUrl && (
                          <div>
                            Kaito URL:{' '}
                            <a
                              href={campaign.kaitoUrl}
                              className="text-blue-400 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {campaign.kaitoUrl}
                            </a>
                          </div>
                        )}
                        {campaign.companyUrl && (
                          <div>
                            Company URL:{' '}
                            <a
                              href={campaign.companyUrl}
                              className="text-blue-400 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {campaign.companyUrl}
                            </a>
                          </div>
                        )}
                        {campaign.airdropUrl && (
                          <div>
                            Airdrop URL:{' '}
                            <a
                              href={campaign.airdropUrl}
                              className="text-blue-400 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {campaign.airdropUrl}
                            </a>
                          </div>
                        )}
                        {campaign.xUrl && (
                          <div>
                            X URL:{' '}
                            <a
                              href={campaign.xUrl}
                              className="text-blue-400 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {campaign.xUrl}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingCampaign(campaign);
                          setIsFormOpen(true);
                        }}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <Form method="post" className="inline">
                        <input type="hidden" name="id" value={campaign.id} />
                        <input type="hidden" name="intent" value="delete" />
                        <button
                          type="submit"
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                          disabled={navigation.state === 'submitting'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
