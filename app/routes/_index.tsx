import { Clock } from 'lucide-react';
import {
  Link,
  useLoaderData,
  Form,
  useNavigation,
  useLocation,
} from '@remix-run/react';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Lamp } from '~/components/ui/lamp';
import { Logo } from '~/components/ui/logo';
import { SocialIcons } from '~/components/SocialIcons';
import prisma from '~/lib/prisma.server';
import { useEffect, useState, useRef } from 'react';

// Base URL for your app (replace with your actual domain)
const BASE_URL = 'https://incentiveiq.com';

export const meta: MetaFunction = () => {
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
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search')?.toLowerCase() || '';
  const sortBy = url.searchParams.get('sortBy') || 'latest';
  const sortOrder = url.searchParams.get('sortOrder') || 'desc';
  const campaignType = url.searchParams.get('campaignType') || 'Airdrop';

  const types = await prisma.type.findMany();
  const tags = await prisma.tag.findMany();
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      type: true,
      tags: true,
    },
  });

  const currentDate = new Date();

  // Split campaigns into active and expired
  const activeCampaigns = campaigns.filter(
    (c) => !c.expiresAt || new Date(c.expiresAt) >= currentDate
  );
  const expiredCampaigns = campaigns.filter(
    (c) => c.expiresAt && new Date(c.expiresAt) < currentDate
  );

  // Featured campaigns (only from active campaigns)
  const featuredCampaigns = activeCampaigns
    .filter((c) => c.featured && !c.isAd)
    .slice(0, 2);
  const adCampaigns = activeCampaigns.filter((c) => c.isAd).slice(0, 2);

  const sortedFeatured = [...featuredCampaigns, ...adCampaigns];
  const adSpots = 2;
  const adCount = adCampaigns.length;
  const placeholdersNeeded = adSpots - adCount;

  for (let i = 0; i < placeholdersNeeded; i++) {
    sortedFeatured.push({
      id: `placeholder-${i}`,
      isPlaceholder: true,
      title: 'Advertise with Us!',
      description:
        'Reach thousands of engaged users by showcasing your campaign here.',
      value: 'Contact Us',
      totalAmount: 0,
      email: 'IncentiveIQ@protonmail.com',
      image:
        'https://pbs.twimg.com/profile_images/1903808850501001216/uqtpjb21_400x400.jpg',
    });
  }

  const featuredRewards = sortedFeatured.slice(0, 4);

  // Active and expired rewards (non-ads)
  let activeRewards = activeCampaigns.filter((c) => !c.isAd);
  let expiredRewards = expiredCampaigns.filter((c) => !c.isAd);

  // Apply search filter
  if (searchTerm) {
    activeRewards = activeRewards.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm)
    );
    expiredRewards = expiredRewards.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  const sortCampaigns = (rewards: any[]) => {
    if (sortBy === 'latest') {
      rewards.sort((a, b) =>
        sortOrder === 'desc'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortBy === 'title') {
      rewards.sort((a, b) =>
        sortOrder === 'desc'
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title)
      );
    }
    return rewards;
  };

  activeRewards = sortCampaigns(activeRewards);
  expiredRewards = sortCampaigns(expiredRewards);

  return new Response(
    JSON.stringify({
      activeRewards,
      expiredRewards,
      featuredRewards,
      campaignType,
      types,
      tags,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
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
  const isExpired = reward.expiresAt && new Date(reward.expiresAt) < new Date();
  const borderClass = reward.isPlaceholder
    ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent'
    : showStatusBadges
    ? reward.isAd
      ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent hover:from-blue-500/30 hover:to-blue-500/10'
      : reward.featured
      ? 'border-2 border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-transparent hover:from-yellow-500/30 hover:to-yellow-500/10'
      : 'border border-slate-800'
    : isExpired
    ? 'border border-slate-700 opacity-75'
    : 'border border-slate-800';

  const Container = reward.isPlaceholder ? 'div' : Link;

  return (
    <Container
      to={
        reward.isPlaceholder ? undefined : `/campaigns/${slugify(reward.title)}`
      }
      className="block h-full"
    >
      <div
        className={`card ${
          reward.isPlaceholder ? '' : 'hover:scale-[1.02]'
        } transition-all h-full bg-slate-900/50 backdrop-blur-sm ${borderClass}`}
      >
        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl">
          <img
            src={reward.image}
            alt={reward.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-start mb-2 p-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-white line-clamp-1">
              {reward.title}
            </h3>
            <div className="flex gap-1 flex-wrap">
              <Badge className="bg-purple-500/10 text-purple-500 border border-purple-500/20">
                {reward.type?.name || 'Ad'}
              </Badge>
              {reward.tags?.map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                >
                  {tag.name}
                </Badge>
              ))}
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
              {isExpired && (
                <Badge className="bg-red-500/10 text-red-500 border border-red-500/20">
                  Expired
                </Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-slate-300 mb-3 px-3 text-xs line-clamp-2">
          {reward.description}
        </p>
        <div className="mb-3 px-3">
          <div className="text-base font-bold text-[rgb(var(--primary))] mb-0.5">
            {reward.value}
          </div>
          {!reward.isPlaceholder && (
            <div className="text-xs text-emerald-300">
              {reward.totalAmount === 0 ? (
                <span>(Est. TBD)</span>
              ) : (
                <span>(Est. ${reward.totalAmount.toLocaleString()})</span>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs px-3 pb-3">
          {reward.isPlaceholder ? (
            <span>Email: {reward.email}</span>
          ) : (
            <>
              <Clock className="w-3 h-3" />
              <span>
                {isExpired ? 'Expired' : 'Expires'}:{' '}
                {reward.expiresAt
                  ? new Date(reward.expiresAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'TBD'}
              </span>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function Index() {
  const {
    activeRewards: initialActiveRewards,
    expiredRewards: initialExpiredRewards,
    featuredRewards,
    campaignType,
    types,
    tags,
  } = useLoaderData<{
    activeRewards: any[];
    expiredRewards: any[];
    featuredRewards: any[];
    campaignType: string;
    types: any[];
    tags: any[];
  }>();
  const navigation = useNavigation();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTab, setSelectedTab] = useState(campaignType || 'Kaito');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredRewards, setFilteredRewards] = useState<any[]>([]); // Unified filtered rewards
  const scrollPositionRef = useRef(0);

  // Define tab options including Expired
  const tabOptions = [
    ...types.map((type) => type.name), // Airdrop, Kaito
    'Expired',
  ].sort((a, b) => {
    const order = ['Airdrop', 'Kaito', 'Expired'];
    return order.indexOf(a) - order.indexOf(b);
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
    const sortByParam = params.get('sortBy') || 'latest';
    const sortOrderParam = params.get('sortOrder') || 'desc';
    const campaignTypeParam = params.get('campaignType') || 'Airdrop';
    setSearchTerm(search);
    setSortBy(sortByParam);
    setSortOrder(sortOrderParam);
    setSelectedTab(campaignTypeParam);
  }, []);

  useEffect(() => {
    if (navigation.state === 'submitting') {
      scrollPositionRef.current = window.scrollY;
    }
  }, [navigation.state]);

  useEffect(() => {
    if (navigation.state === 'idle') {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [navigation.state, location]);

  useEffect(() => {
    let rewardsToFilter: any[] = [];

    // Determine which rewards to show based on the selected tab
    if (selectedTab === 'Expired') {
      rewardsToFilter = [...(initialExpiredRewards || [])];
    } else {
      rewardsToFilter = [...(initialActiveRewards || [])].filter(
        (reward) => reward.type?.name === selectedTab
      );
    }

    // Filter by search term
    if (searchTerm) {
      rewardsToFilter = rewardsToFilter.filter(
        (reward) =>
          reward.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reward.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      rewardsToFilter = rewardsToFilter.filter((reward) =>
        reward.tags?.some((tag) => selectedTags.includes(tag.name))
      );
    }

    // Sort
    const sortRewards = (rewards: any[]) => {
      if (sortBy === 'latest') {
        rewards.sort((a, b) =>
          sortOrder === 'desc'
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortBy === 'title') {
        rewards.sort((a, b) =>
          sortOrder === 'desc'
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title)
        );
      }
      return rewards;
    };

    setFilteredRewards(sortRewards(rewardsToFilter));
  }, [
    searchTerm,
    sortBy,
    sortOrder,
    selectedTab,
    selectedTags,
    initialActiveRewards,
    initialExpiredRewards,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (newSortBy: string) => {
    const newSortOrder =
      sortBy === newSortBy ? (sortOrder === 'desc' ? 'asc' : 'desc') : 'desc';
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleTagToggle = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="h-16 sm:h-24 flex items-center justify-between">
            <Logo />
            <SocialIcons />
          </div>
        </div>
      </header>

      <Lamp>
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="mb-4 sm:mb-8">
            <div className="p-4 max-w-7xl mx-auto w-full pt-24 sm:pt-32 md:pt-24">
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
                Discover Exclusive <br /> Rewards & Airdrops
              </h1>
              <p className="mt-4 font-normal text-sm sm:text-base text-slate-400 max-w-lg text-center mx-auto">
                Stay ahead of the game on exclusive airdrops with{' '}
                <span className="text-[rgb(var(--primary))]">IncentiveIQ!</span>{' '}
                <br />
              </p>
            </div>
          </div>

          <div className="mb-8 sm:mb-12" id="featured">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
              Our Picks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredRewards.length === 0 ? (
                <p className="text-slate-400 col-span-full text-center text-sm sm:text-base">
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                  {tabOptions.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`text-xl sm:text-2xl font-bold px-2 py-1 rounded-md ${
                        selectedTab === tab
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      } transition-colors`}
                    >
                      {tab} Campaigns
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.name)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                        selectedTags.includes(tag.name)
                          ? 'bg-indigo-400/40 text-indigo-100 border border-indigo-400/60'
                          : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600/50'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search campaigns..."
                    className="p-2 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500 w-full sm:w-auto text-sm sm:text-base"
                  />
                </div>
                <div className="flex gap-2 sm:gap-4">
                  <button
                    onClick={() => handleSortChange('latest')}
                    className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors flex items-center gap-1 text-sm sm:text-base"
                  >
                    Latest{' '}
                    {sortBy === 'latest' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => handleSortChange('title')}
                    className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors flex items-center gap-1 text-sm sm:text-base"
                  >
                    Title{' '}
                    {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                </div>
              </div>
            </div>

            {/* Unified Campaigns Section */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
                {selectedTab} Campaigns
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredRewards.length === 0 ? (
                  <p className="text-slate-400 col-span-full text-center text-sm sm:text-base">
                    {searchTerm || selectedTags.length > 0
                      ? `No ${selectedTab.toLowerCase()} campaigns match your filters.`
                      : `No ${selectedTab.toLowerCase()} campaigns available yet.`}
                  </p>
                ) : (
                  filteredRewards.map((reward) => (
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
        </div>
      </Lamp>
    </div>
  );
}
