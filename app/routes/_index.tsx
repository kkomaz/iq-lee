import { Clock } from 'lucide-react';
import {
  Link,
  useLoaderData,
  Form,
  useSubmit,
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
    // Open Graph tags for social media sharing
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    // Twitter Card tags
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

  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const featuredCampaigns = campaigns
    .filter((c) => c.featured && !c.isAd)
    .slice(0, 2);

  const adCampaigns = campaigns.filter((c) => c.isAd).slice(0, 2);

  const sortedFeatured = [];
  sortedFeatured.push(...featuredCampaigns);

  const adSpots = 2;
  const adCount = adCampaigns.length;
  sortedFeatured.push(...adCampaigns);

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
  let rewards = campaigns.filter((c) => !c.isAd);

  if (searchTerm) {
    rewards = rewards.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm)
    );
  }

  if (sortBy === 'latest') {
    rewards.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  } else if (sortBy === 'title') {
    rewards.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return sortOrder === 'desc'
        ? titleB.localeCompare(titleA)
        : titleA.localeCompare(titleB);
    });
  }

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
      className={`px-2 py-1 text-xs sm:text-xs font-semibold rounded-full ${className}`}
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
  const borderClass = reward.isPlaceholder
    ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent'
    : showStatusBadges
    ? reward.isAd
      ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-500/20 to-transparent hover:from-blue-500/30 hover:to-blue-500/10'
      : reward.featured
      ? 'border-2 border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-transparent hover:from-yellow-500/30 hover:to-yellow-500/10'
      : 'border border-slate-800'
    : 'border border-slate-800';

  const Container = reward.isPlaceholder ? 'div' : Link;

  return (
    <Container
      to={
        reward.isPlaceholder
          ? undefined
          : `/campaigns/${slugify(reward.title)}-${reward.id}`
      }
      className="block h-full"
    >
      <div
        className={`card ${
          reward.isPlaceholder ? '' : 'hover:scale-[1.02]'
        } transition-all h-full bg-slate-900/50 backdrop-blur-sm ${borderClass}`}
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
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {reward.title}
            </h3>
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
        <p className="text-slate-300 mb-4 line-clamp-2 text-sm sm:text-base">
          {reward.description}
        </p>
        <div className="mb-4">
          <div className="text-xl sm:text-2xl font-bold text-[rgb(var(--primary))] mb-0.5">
            {reward.value}
          </div>
          {!reward.isPlaceholder && (
            <div className="text-xs sm:text-sm text-emerald-300">
              {reward.totalAmount === 0 ? (
                <span>(Est. TBD)</span>
              ) : (
                <span>(Est. ${reward.totalAmount.toLocaleString()})</span>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
          {reward.isPlaceholder ? (
            <span>Email: {reward.email}</span>
          ) : (
            <>
              <Clock className="w-4 h-4" />
              <span>
                Expires:{' '}
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
  const { rewards, featuredRewards } = useLoaderData<{
    rewards: any[];
    featuredRewards: any[];
  }>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [sortOrder, setSortOrder] = useState('desc');
  const scrollPositionRef = useRef(0);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
    const sortByParam = params.get('sortBy') || 'latest';
    const sortOrderParam = params.get('sortOrder') || 'desc';
    setSearchTerm(search);
    setSortBy(sortByParam);
    setSortOrder(sortOrderParam);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const formData = new FormData();
      formData.set('search', value);
      formData.set('sortBy', sortBy);
      formData.set('sortOrder', sortOrder);
      submit(formData, { method: 'get', replace: true });
    }, 300);
  };

  const handleSortChange = (newSortBy: string) => {
    let newSortOrder = sortOrder;
    if (sortBy === newSortBy) {
      newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    } else {
      newSortOrder = 'desc';
    }

    setSortBy(newSortBy);
    setSortOrder(newSortOrder);

    const formData = new FormData();
    formData.set('search', searchTerm);
    formData.set('sortBy', newSortBy);
    formData.set('sortOrder', newSortOrder);
    submit(formData, { method: 'get', replace: true });
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
          <div className="mb-12 sm:mb-16">
            <div className="p-4 max-w-7xl mx-auto w-full pt-24 sm:pt-32 md:pt-24">
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500/80">
                Discover Exclusive <br /> Rewards & Campaigns
              </h1>
              <p className="mt-4 font-normal text-sm sm:text-base text-slate-400 max-w-lg text-center mx-auto">
                Stay ahead of the game with{' '}
                <span className="text-[rgb(var(--primary))] ">
                  IncentiveIQ!
                </span>{' '}
                Earn rewards for engaging with projects on Kaito, climb the
                leaderboard, and unlock exclusive perks, early access, and
                unique opportunities.
              </p>
              {/* <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4">
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
              </div> */}
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
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                All Campaigns
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto">
                <Form
                  method="get"
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <input
                    type="text"
                    name="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search campaigns..."
                    className="p-2 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500 w-full sm:w-auto text-sm sm:text-base"
                  />
                </Form>
                <div className="flex gap-2 sm:gap-4">
                  <button
                    onClick={() => handleSortChange('latest')}
                    className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => handleSortChange('title')}
                    className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-colors flex items-center gap-1 text-sm sm:text-base"
                  >
                    Title{' '}
                    {sortBy === 'title' && sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {rewards.length === 0 ? (
                <p className="text-slate-400 col-span-full text-center text-sm sm:text-base">
                  {searchTerm
                    ? 'No campaigns match your search.'
                    : 'No campaigns available yet.'}
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
