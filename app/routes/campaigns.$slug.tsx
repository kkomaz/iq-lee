import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import {
  ArrowLeft,
  Clock,
  Link as LinkIcon,
  Globe,
  Gift,
  AppWindow,
} from 'lucide-react';
import prisma from '~/lib/prisma.server';
import { SocialIcons } from '~/components/SocialIcons';
import XIcon from '~/components/XIcon';

// Base URL for your app (replace with your actual domain)
const BASE_URL = 'https://incentiveiq.com';

// Define the meta function to accept the data from the loader
export const meta: MetaFunction = ({ data }) => {
  const campaign = data?.campaign;
  const title = campaign
    ? `${campaign.title} - IncentiveIQ`
    : 'IncentiveIQ - Campaign Details';
  const description = campaign
    ? `Join the ${campaign.title} campaign on IncentiveIQ and earn rewards worth ${campaign.value}. Learn more and participate now!`
    : 'Learn more about this campaign and how to participate';

  // Slugify the campaign title for the URL
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  const campaignUrl = campaign
    ? `${BASE_URL}/campaigns/${slugify(campaign.title)}-${campaign.id}`
    : BASE_URL;

  // Ensure image URLs are absolute
  const campaignImage = campaign?.image?.startsWith('http')
    ? campaign.image
    : campaign?.image
    ? `${BASE_URL}${campaign.image}`
    : null;
  const defaultImage = `${BASE_URL}/og-image.jpg`;
  const image = campaignImage || defaultImage;

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
    { property: 'og:url', content: campaignUrl },
    { property: 'og:image', content: image },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
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

  const randomCampaigns = await prisma.$queryRaw`
    SELECT * FROM "Campaign"
    WHERE id != ${campaignId} AND "isAd" = false
    ORDER BY RANDOM()
    LIMIT 2
  `;

  return new Response(JSON.stringify({ campaign, randomCampaigns }), {
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

function CampaignCard({ campaign }: { campaign: any }) {
  const borderClass = campaign.isAd
    ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent hover:from-blue-500/30 hover:to-blue-500/10'
    : 'border-2 border-gray-500 bg-gradient-to-r from-gray-500/20 to-transparent hover:from-gray-500/30 hover:to-gray-500/10';

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  return (
    <Link
      to={`/campaigns/${slugify(campaign.title)}-${campaign.id}`}
      className="block h-full"
    >
      <div
        className={`card hover:scale-[1.02] transition-all h-full bg-slate-900/50 backdrop-blur-sm ${borderClass}`}
      >
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white">{campaign.title}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4 line-clamp-2">
          {campaign.description}
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <div className="text-xl font-bold text-[rgb(var(--primary))]">
            {campaign.value}
          </div>
          <div className="text-sm text-emerald-300">
            (Est. ${campaign.totalAmount.toLocaleString()})
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span>
            Expires: {new Date(campaign.expiresAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CampaignDetail() {
  const { campaign, randomCampaigns } = useLoaderData<any>();

  const borderColor = campaign.featured
    ? 'border-yellow-500'
    : campaign.isAd
    ? 'border-blue-500'
    : campaign.isNew
    ? 'border-emerald-500'
    : 'border-slate-900';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex-1">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-0">
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 ${borderColor} flex-shrink-0`}
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
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
          <div className="w-full sm:w-[416px] bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-[rgb(var(--primary))] border-opacity-30 shadow-lg hidden md:block">
            <div className="text-lg sm:text-xl font-semibold text-[rgb(var(--primary))] font-sans text-wrap">
              {campaign.value}
            </div>
            <div className="text-xs sm:text-sm text-slate-200 font-sans mt-1">
              Total:{' '}
              {campaign.totalAmount === 0
                ? 'TBD'
                : `$${campaign.totalAmount.toLocaleString()}`}
            </div>
            {/* Expiration Date */}
            <div className="flex items-center gap-2 text-slate-400 mt-2 justify-start text-xs sm:text-sm">
              <Clock className="w-4 h-4" />
              <span>
                Expires:{' '}
                {campaign.expiresAt
                  ? new Date(campaign.expiresAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'TBD'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-between mb-4 sm:mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campaigns</span>
          </Link>
          {/* <SocialIcons /> */}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          <div className="space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                About
              </h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-slate-300 text-sm sm:text-base">
                  {campaign.description}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                Campaign Information
              </h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-slate-300 text-sm sm:text-base">
                  {campaign.longDescription}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                Reward Details
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 mb-2 text-sm sm:text-base">
                  Reward Details:{' '}
                  <span className="text-[rgb(var(--primary))]">
                    {campaign.value}
                  </span>
                </p>
                <p className="text-slate-300 text-sm sm:text-base">
                  Total Estimated Amount:{' '}
                  <span className="text-[rgb(var(--primary))]">
                    {campaign.totalAmount === 0 ? (
                      <span>TBD</span>
                    ) : (
                      <span>${campaign.totalAmount.toLocaleString()}</span>
                    )}
                  </span>
                </p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="w-full sm:w-[416px] bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-[rgb(var(--primary))] border-opacity-30 shadow-lg block md:hidden mb-4">
              <div className="text-lg sm:text-xl font-semibold text-[rgb(var(--primary))] font-sans text-wrap">
                {campaign.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-sans mt-1">
                Total:{' '}
                {campaign.totalAmount === 0
                  ? 'TBD'
                  : `$${campaign.totalAmount.toLocaleString()}`}
              </div>
              {/* Expiration Date */}
              <div className="flex items-center gap-2 text-slate-400 mt-2 justify-start text-xs sm:text-sm">
                <Clock className="w-4 h-4" />
                <span>
                  Expires:{' '}
                  {campaign.expiresAt
                    ? new Date(campaign.expiresAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'TBD'}
                </span>
              </div>
            </div>
            <div className="bg-slate-900/70 rounded-xl p-4 sm:p-6 border border-[rgb(var(--primary))] border-opacity-30 shadow-inner">
              {/* Links Section */}
              <div className="space-y-3 mb-6">
                {campaign.companyUrl && (
                  <a
                    href={campaign.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-all transform hover:scale-105 hover:bg-slate-800/50 rounded-lg p-2"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Website</span>
                  </a>
                )}
                {campaign.airdropUrl && (
                  <a
                    href={campaign.airdropUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-all transform hover:scale-105 hover:bg-slate-800/50 rounded-lg p-2"
                  >
                    <AppWindow className="w-5 h-5" />
                    <span>App</span>
                  </a>
                )}
                {campaign.xUrl && (
                  <a
                    href={campaign.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-all transform hover:scale-105 hover:bg-slate-800/50 rounded-lg p-2"
                  >
                    <XIcon url={campaign.xUrl} className="w-5 h-5" />
                    <span>Follow on X</span>
                  </a>
                )}
              </div>
              {/* Link to campaign.kaitoUrl */}
              {campaign.kaitoUrl ? (
                <a
                  href={campaign.kaitoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[rgb(var(--primary))] text-slate-950 rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all text-center flex items-center justify-center gap-2"
                >
                  <img
                    src="https://pbs.twimg.com/profile_images/1866818904800063488/Qm4DW488_400x400.jpg"
                    alt="Leaderboard Icon"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>View Leaderboard</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 sm:my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        </div>

        {/* Explore More Campaigns Section */}
        <div className="pt-6 sm:pt-8 pb-10 sm:pb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
            Explore More Campaigns
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {randomCampaigns.length === 0 ? (
              <p className="text-slate-400 col-span-full text-center">
                No other campaigns available yet.
              </p>
            ) : (
              randomCampaigns.map((campaign: any) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            )}
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
