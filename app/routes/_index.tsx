import { Clock } from 'lucide-react';
import { Link, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Lamp } from '~/components/ui/lamp';
import { Logo } from '~/components/ui/logo';
import prisma from '~/lib/prisma.server';

export const meta = () => {
  return [
    { title: 'KaitoRewards - Earn Rewards for Your Contributions' },
    {
      name: 'description',
      content: 'Discover exciting rewards and opportunities',
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Filter featured campaigns (featured or isAd)
  const featuredCampaigns = campaigns.filter((c) => c.featured || c.isAd);

  // Sort featured campaigns: non-ads first, then ads (up to 2) at 3rd/4th positions
  const ads = featuredCampaigns.filter((c) => c.isAd);
  const nonAds = featuredCampaigns.filter((c) => !c.isAd);
  const sortedFeatured = [];

  // Handle ad placement
  if (ads.length === 0) {
    sortedFeatured.push(...nonAds);
  } else if (ads.length === 1) {
    // One ad goes to 4th position (index 3)
    sortedFeatured.push(...nonAds.slice(0, 3), ads[0], ...nonAds.slice(3));
  } else {
    // Two or more ads go to 3rd and 4th positions (indices 2 and 3)
    sortedFeatured.push(
      ...nonAds.slice(0, 2),
      ads[0],
      ads[1],
      ...nonAds.slice(2)
    );
  }

  // Limit to 4 featured items if more exist
  const featuredRewards = sortedFeatured.slice(0, 4);

  // All rewards exclude ads
  const rewards = campaigns.filter((c) => !c.isAd);

  return new Response(JSON.stringify({ rewards, featuredRewards }), {
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

function RewardCard({
  reward,
  showStatusBadges = false,
}: {
  reward: any;
  showStatusBadges?: boolean;
}) {
  // Determine border class based on status when showStatusBadges is true
  const borderClass = showStatusBadges
    ? reward.isAd
      ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent'
      : reward.featured
      ? 'border-2 border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-transparent'
      : 'border border-slate-800'
    : 'border border-slate-800';

  return (
    <Link to={`/campaigns/${reward.id}`} className="block h-full">
      <div
        className={`card hover :scale-[1.02] transition-all h-full bg-slate-900/50 backdrop-blur-sm ${borderClass}`}
      >
        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl">
          <img
            src={reward.image}
            alt={reward.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white">{reward.title}</h3>
            <div className="flex gap-2">
              {showStatusBadges && reward.featured && (
                <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                  Featured
                </Badge>
              )}
              {reward.isNew && (
                <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  New
                </Badge>
              )}
              {showStatusBadges && reward.isAd && (
                <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Ad
                </Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-slate-300 mb-4 line-clamp-2">{reward.description}</p>
        <div className="text-2xl font-bold text-[rgb(var(--primary))] mb-4">
          ${reward.value}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span>
            Expires: {new Date(reward.expiresAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Index() {
  const { rewards, featuredRewards } = useLoaderData<{
    rewards: any[];
    featuredRewards: any[];
  }>();

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-24 flex items-center">
            <Logo />
          </div>
        </div>
      </header>

      <Lamp>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-16">
            <div className="p-4 max-w-7xl mx-auto w-full pt-32 md:pt-24">
              <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
                Discover Exclusive <br /> Rewards & Campaigns
              </h1>
              <p className="mt-4 font-normal text-base text-slate-400 max-w-lg text-center mx-auto ">
                Stay ahead of the curve with KaitoRewards. Get early access to
                upcoming campaigns, exclusive memberships, and unique
                opportunities.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-[rgb(var(--primary))] text-slate-950 rounded-lg font-medium hover:opacity-90 transition-all"
                >
                  Get Started
                </Link>
                <Link
                  to="#featured"
                  className="px-6 py-3 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  View Rewards
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-12" id="featured">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Featured Campaigns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRewards.length === 0 ? (
                <p className="text-slate-400 col-span-full text-center">
                  No featured campaigns available yet.
                </p>
              ) : (
                featuredRewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    showStatusBadges={true}
                  />
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">All Campaigns</h2>
              <div className="flex gap-4">
                <button className="text-slate-400 hover:text-white transition-colors">
                  Latest
                </button>
                <button className="text-slate-400 hover:text-white transition-colors">
                  Value ↑
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.length === 0 ? (
                <p className="text-slate-400 col-span-full text-center">
                  No campaigns available yet.
                </p>
              ) : (
                rewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    showStatusBadges={false}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </Lamp>
    </div>
  );
}
