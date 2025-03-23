import { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ArrowLeft, Clock } from 'lucide-react';
import prisma from '~/lib/prisma.server';

export const meta = () => {
  return [
    { title: 'Campaign Details - KaitoRewards' },
    {
      name: 'description',
      content: 'Learn more about this campaign and how to participate',
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slugParam = params.slug as string;
  const idMatch = slugParam.match(/(\d+)$/);
  if (!idMatch) {
    throw new Response('Invalid campaign URL', { status: 400 });
  }
  const campaignId = parseInt(idMatch[1]);

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    throw new Response('Campaign not found', { status: 404 });
  }

  return new Response(JSON.stringify(campaign), {
    headers: { 'Content-Type': 'application/json' },
  });
}

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

export default function CampaignDetail() {
  const campaign = useLoaderData<any>();

  const borderColor = campaign.featured
    ? 'border-yellow-500'
    : campaign.isAd
    ? 'border-blue-500'
    : campaign.isNew
    ? 'border-emerald-500'
    : 'border-slate-900';

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campaigns</span>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div
              className={`w-16 h-16 rounded-full overflow-hidden border-2 ${borderColor} flex-shrink-0`}
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {campaign.title}
              </h1>
              <div className="flex gap-2 mt-2">
                {campaign.featured && (
                  <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    Featured
                  </Badge>
                )}
                {campaign.isAd && (
                  <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Ad
                  </Badge>
                )}
                {campaign.isNew && (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    New
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-[rgb(var(--primary))] border-opacity-30 shadow-lg">
            <div className="text-2xl font-semibold text-[rgb(var(--primary))] font-sans">
              {campaign.value}
            </div>
            <div className="text-sm text-slate-200 font-sans mt-1">
              Total: ${campaign.totalAmount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  About This Campaign
                </h2>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-slate-300">
                    {campaign.longDescription}
                  </pre>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  Reward Details
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300">
                    Total Amount: ${campaign.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-slate-300">
                    Distribution details coming soon. Stay tuned for updates on
                    how rewards will be allocated!
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 rounded-xl p-6 sticky top-8">
              <div className="flex items-center gap-2 text-slate-400 mb-6">
                <Clock className="w-5 h-5" />
                <span>
                  Expires: {new Date(campaign.expiresAt).toLocaleDateString()}
                </span>
              </div>

              <Link
                to={`/campaigns/${campaign.id}/leaderboard`}
                className="block w-full bg-[rgb(var(--primary))] text-slate-950 rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all mb-4 text-center"
              >
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-800 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
          Oops!
        </h1>
        <p className="text-slate-300 mb-6">
          {error.message || 'Something went wrong'}
        </p>
        <Link
          to="/"
          className="bg-[rgb(var(--primary))] text-slate-950 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
