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

  // Fetch up to 2 featured campaigns (non-ads)
  const featuredCampaigns = campaigns
    .filter((c) => c.featured && !c.isAd)
    .slice(0, 2);

  // Fetch up to 2 ad campaigns
  const adCampaigns = campaigns.filter((c) => c.isAd).slice(0, 2);

  // Combine into a list of 4, with ads in 3rd and 4th positions
  const sortedFeatured = [];
  // Add featured campaigns (up to 2)
  sortedFeatured.push(...featuredCampaigns);

  // Add ad campaigns (up to 2)
  const adSpots = 2; // We want 2 ad spots
  const adCount = adCampaigns.length;
  sortedFeatured.push(...adCampaigns);

  // If fewer than 2 ad campaigns, fill with placeholders
  const placeholdersNeeded = adSpots - adCount;
  for (let i = 0; i < placeholdersNeeded; i++) {
    sortedFeatured.push({
      id: `placeholder-${i}`,
      isPlaceholder: true,
      title: 'Advertise with Us!',
      description:
        'Reach thousands of engaged users by showcasing your campaign here.',
      value: 'Contact us for details',
      totalAmount: 0,
      expiresAt: new Date('2025-12-31').toISOString(),
      image: 'https://via.placeholder.com/150?text=Advertise',
    });
  }

  const featuredRewards = sortedFeatured.slice(0, 4); // Ensure exactly 4 items
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
  // Apply blue border for ads and placeholders, yellow for featured, default otherwise
  const borderClass = reward.isPlaceholder
    ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent hover:from-blue-500/30 hover:to-blue-500/10'
    : showStatusBadges
    ? reward.isAd
      ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent hover:from-blue-500/30 hover:to-blue-500/10'
      : reward.featured
      ? 'border-2 border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-transparent hover:from-yellow-500/30 hover:to-yellow-500/10'
      : 'border border-slate-800'
    : 'border border-slate-800';

  return (
    <Link
      to={
        reward.isPlaceholder
          ? '/contact'
          : `/campaigns/${slugify(reward.title)}-${reward.id}`
      }
      className="block h-full"
    >
      <div
        className={`card hover:scale-[1.02] transition-all h-full bg-slate-900/50 backdrop-blur-sm ${borderClass}`}
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
              {showStatusBadges && !reward.isPlaceholder && reward.featured && (
                <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                  Featured
                </Badge>
              )}
              {showStatusBadges && !reward.isPlaceholder && reward.isNew && (
                <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  New
                </Badge>
              )}
              {showStatusBadges && !reward.isPlaceholder && reward.isAd && (
                <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Ad
                </Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-slate-300 mb-4 line-clamp-2">{reward.description}</p>
        <div className="flex items-baseline gap-2 mb-4">
          <div className="text-2xl font-bold text-[rgb(var(--primary))]">
            {reward.value}
          </div>
          <div className="text-sm text-emerald-300">
            (Est. ${reward.totalAmount.toLocaleString()})
          </div>
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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
              <p className="mt-4 font-normal text-base text-slate-400 max-w-lg text-center mx-auto">
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
            <h2 className="text-2xl font-bold mb-6 text-white">Our Picks</h2>
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
