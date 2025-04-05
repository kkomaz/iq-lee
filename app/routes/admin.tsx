import { Trophy, ChevronDown, Trash2, Pencil } from 'lucide-react';
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
import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Select from 'react-select'; // Added react-select import

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const allowedUserId = process.env.ALLOWED_PRIVY_USER_ID;
  try {
    await prisma.$connect();
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        type: true,
        tags: true,
        chain: true,
      },
    });

    const types = await prisma.type.findMany();
    const tags = await prisma.tag.findMany();
    const chains = await prisma.chain.findMany();

    const serializedCampaigns = campaigns.map((campaign) => ({
      ...campaign,
      createdAt: campaign.createdAt.toISOString(),
      updatedAt: campaign.updatedAt.toISOString(),
      expiresAt: campaign.expiresAt ? campaign.expiresAt.toISOString() : null,
      type: {
        ...campaign.type,
        createdAt: campaign.type.createdAt.toISOString(),
        updatedAt: campaign.type.updatedAt.toISOString(),
      },
      tags: campaign.tags.map((tag) => ({
        ...tag,
        createdAt: tag.createdAt.toISOString(),
        updatedAt: tag.updatedAt.toISOString(),
      })),
      chain: campaign.chain
        ? {
            ...campaign.chain,
            createdAt: campaign.chain.createdAt.toISOString(),
            updatedAt: campaign.chain.updatedAt.toISOString(),
          }
        : null,
    }));

    const serializedTypes = types.map((type) => ({
      ...type,
      createdAt: type.createdAt.toISOString(),
      updatedAt: type.updatedAt.toISOString(),
    }));

    const serializedTags = tags.map((tag) => ({
      ...tag,
      createdAt: tag.createdAt.toISOString(),
      updatedAt: tag.updatedAt.toISOString(),
    }));

    const serializedChains = chains.map((chain) => ({
      ...chain,
      createdAt: chain.createdAt.toISOString(),
      updatedAt: chain.updatedAt.toISOString(),
    }));

    return new Response(
      JSON.stringify({
        campaigns: serializedCampaigns,
        allowedUserId,
        types: serializedTypes,
        tags: serializedTags,
        chains: serializedChains,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in admin loader:', error);
    throw new Error('Failed to load campaigns. Please try again later.');
  } finally {
    await prisma.$disconnect();
  }
};

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
    const typeId = parseInt(formData.get('typeId') as string);
    const chainId = formData.get('chainId')
      ? parseInt(formData.get('chainId') as string)
      : null;
    const kaitoUrl = formData.get('kaitoUrl') as string;
    const companyUrl = formData.get('companyUrl') as string;
    const airdropUrl = formData.get('airdropUrl') as string;
    const xUrl = formData.get('xUrl') as string;
    const tagIds = formData.getAll('tags').map((id) => parseInt(id as string));

    if (!title) {
      return new Response(
        JSON.stringify({ error: 'Campaign title is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!typeId) {
      return new Response(
        JSON.stringify({ error: 'Campaign type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (chainId) {
      const chainExists = await prisma.chain.findUnique({
        where: { id: chainId },
      });
      if (!chainExists) {
        return new Response(
          JSON.stringify({ error: 'Invalid chain selected' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
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
        typeId,
        chainId,
        kaitoUrl: kaitoUrl || null,
        companyUrl: companyUrl || null,
        airdropUrl: airdropUrl || null,
        xUrl: xUrl || null,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
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
    const typeId = parseInt(formData.get('typeId') as string);
    const chainId = formData.get('chainId')
      ? parseInt(formData.get('chainId') as string)
      : null;
    const kaitoUrl = formData.get('kaitoUrl') as string;
    const companyUrl = formData.get('companyUrl') as string;
    const airdropUrl = formData.get('airdropUrl') as string;
    const xUrl = formData.get('xUrl') as string;
    const tagIds = formData.getAll('tags').map((id) => parseInt(id as string));

    if (!id || !title) {
      return new Response(
        JSON.stringify({ error: 'ID and title are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (!typeId) {
      return new Response(
        JSON.stringify({ error: 'Campaign type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (chainId) {
      const chainExists = await prisma.chain.findUnique({
        where: { id: chainId },
      });
      if (!chainExists) {
        return new Response(
          JSON.stringify({ error: 'Invalid chain selected' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
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
        typeId,
        chainId,
        kaitoUrl: kaitoUrl || null,
        companyUrl: companyUrl || null,
        airdropUrl: airdropUrl || null,
        xUrl: xUrl || null,
        tags: {
          set: tagIds.map((id) => ({ id })),
        },
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
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
  const errorMessage = error?.message || 'An unexpected error occurred';
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-800 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
          Error
        </h1>
        <p className="text-slate-300 mb-6">{errorMessage}</p>
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
  const { campaigns, allowedUserId, types, tags, chains } = useLoaderData<{
    campaigns: any[];
    allowedUserId: string;
    types: { id: number; name: string; createdAt: string; updatedAt: string }[];
    tags: { id: number; name: string; createdAt: string; updatedAt: string }[];
    chains: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    }[];
  }>();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'kaito' | 'airdrop'>('all');
  const [selectedTags, setSelectedTags] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    if (!isModalOpen) {
      setEditingCampaign(null);
      setSelectedTags([]);
    } else if (editingCampaign) {
      setSelectedTags(
        editingCampaign.tags.map((tag) => ({ value: tag.id, label: tag.name }))
      );
    }
  }, [isModalOpen, editingCampaign]);

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

  const openModal = (campaign = null) => {
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filter === 'all') return true;
    if (filter === 'kaito') return campaign.type.name === 'Kaito';
    if (filter === 'airdrop') return campaign.type.name === 'Airdrop';
    return false;
  });

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
              onClick={() => openModal()}
              className="bg-[rgb(var(--primary))] text-slate-950 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2"
            >
              New Campaign
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[rgb(var(--primary))] text-slate-950'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              All Campaigns
            </button>
            <button
              onClick={() => setFilter('kaito')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'kaito'
                  ? 'bg-[rgb(var(--primary))] text-slate-950'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              Kaito Campaigns
            </button>
            <button
              onClick={() => setFilter('airdrop')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'airdrop'
                  ? 'bg-[rgb(var(--primary))] text-slate-950'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              Airdrop Campaigns
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Current Campaigns
            </h3>
            {filteredCampaigns.length === 0 ? (
              <p className="text-slate-400 text-center">
                No campaigns match the selected filter. Try a different filter
                or create a new campaign!
              </p>
            ) : (
              filteredCampaigns.map((campaign) => (
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
                        <span>Type: {campaign.type.name} • </span>
                        <span>Chain: {campaign.chain?.name || 'None'} • </span>
                        <span>
                          Expires:{' '}
                          {campaign.expiresAt
                            ? new Date(campaign.expiresAt).toLocaleDateString()
                            : 'No expiration'}
                        </span>{' '}
                        • <span>Value: {campaign.value}</span> •{' '}
                        <span>Total Amount: {campaign.totalAmount}</span>
                      </div>
                      <div className="text-sm text-slate-400 mt-1">
                        {campaign.tags.length > 0 && (
                          <div>
                            Tags:{' '}
                            {campaign.tags.map((tag) => tag.name).join(', ')}
                          </div>
                        )}
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
                        onClick={() => openModal(campaign)}
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

          <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={() => setIsModalOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-slate-900/95 backdrop-blur-sm p-6 border border-slate-800 shadow-xl transition-all">
                      <div className="flex justify-between items-center mb-6">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-bold text-white"
                        >
                          {editingCampaign
                            ? 'Edit Campaign'
                            : 'Create Campaign'}
                        </Dialog.Title>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-slate-400 hover:text-white transition-colors"
                          aria-label="Close modal"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <Form method="post" className="space-y-6">
                        <input type="hidden" name="userId" value={user?.id} />
                        {editingCampaign && (
                          <input
                            type="hidden"
                            name="id"
                            value={editingCampaign.id}
                          />
                        )}
                        <input
                          type="hidden"
                          name="intent"
                          value={editingCampaign ? 'update' : 'create'}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              htmlFor="typeId"
                              className="block text-slate-300 text-sm font-medium mb-2"
                            >
                              Campaign Type
                            </label>
                            <select
                              id="typeId"
                              name="typeId"
                              defaultValue={editingCampaign?.typeId || ''}
                              className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all"
                              required
                            >
                              <option value="">Select Type</option>
                              {types.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
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
                              htmlFor="chainId"
                              className="block text-slate-300 text-sm font-medium mb-2"
                            >
                              Chain (Optional)
                            </label>
                            <select
                              id="chainId"
                              name="chainId"
                              defaultValue={editingCampaign?.chainId || ''}
                              className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all"
                            >
                              <option value="">No Chain</option>
                              {chains.map((chain) => (
                                <option key={chain.id} value={chain.id}>
                                  {chain.name}
                                </option>
                              ))}
                            </select>
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
                          <div className="md:col-span-2">
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

                          <div className="md:col-span-2">
                            <label
                              htmlFor="tags"
                              className="block text-slate-300 text-sm font-medium mb-2"
                            >
                              Tags
                            </label>
                            <Select
                              isMulti
                              name="tags"
                              options={tags.map((tag) => ({
                                value: tag.id,
                                label: tag.name,
                              }))}
                              value={selectedTags}
                              onChange={(selectedOptions) =>
                                setSelectedTags(selectedOptions || [])
                              }
                              className="text-black"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                                  borderColor: '#334155',
                                  color: 'white',
                                  '&:hover': {
                                    borderColor: 'rgb(var(--primary))',
                                  },
                                }),
                                menu: (base) => ({
                                  ...base,
                                  backgroundColor: 'rgba(30, 41, 59, 0.95)',
                                }),
                                option: (base, state) => ({
                                  ...base,
                                  backgroundColor: state.isSelected
                                    ? 'rgb(var(--primary))'
                                    : state.isFocused
                                    ? '#4b5e77'
                                    : 'transparent',
                                  color: state.isSelected ? 'black' : 'white',
                                }),
                                multiValue: (base) => ({
                                  ...base,
                                  backgroundColor: 'rgb(var(--primary))',
                                  color: 'black',
                                }),
                                multiValueLabel: (base) => ({
                                  ...base,
                                  color: 'black',
                                }),
                                multiValueRemove: (base) => ({
                                  ...base,
                                  color: 'black',
                                  '&:hover': { backgroundColor: '#d97706' },
                                }),
                                input: (base) => ({
                                  ...base,
                                  color: 'white',
                                }),
                              }}
                              placeholder="Select tags..."
                            />
                            {selectedTags.map((tag) => (
                              <input
                                key={tag.value}
                                type="hidden"
                                name="tags"
                                value={tag.value}
                              />
                            ))}
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
                            <label
                              htmlFor="isAd"
                              className="text-slate-300 text-sm"
                            >
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
                            <label
                              htmlFor="isNew"
                              className="text-slate-300 text-sm"
                            >
                              Is New
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                          <button
                            type="submit"
                            disabled={navigation.state === 'submitting'}
                            className="flex-1 bg-[rgb(var(--primary))] text-slate-950 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
                          >
                            {editingCampaign
                              ? 'Update Campaign'
                              : 'Create Campaign'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-all"
                          >
                            Cancel
                          </button>
                        </div>

                        {actionData?.error && (
                          <p className="text-red-400 text-sm text-center mt-2">
                            {actionData.error}
                          </p>
                        )}
                        {actionData?.success && (
                          <p className="text-emerald-400 text-sm text-center mt-2">
                            {actionData.success}
                          </p>
                        )}
                      </Form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
}
