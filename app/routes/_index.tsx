import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { Clock } from "lucide-react";
import { Lamp } from "~/components/ui/lamp";
import { Logo } from "~/components/ui/logo";

export const meta = () => {
  return [
    { title: "KaitoRewards - Earn Rewards for Your Contributions" },
    { name: "description", content: "Discover exciting rewards and opportunities" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );

  const testData = {
    rewards: [
      {
        id: "1",
        title: "Early Access NFT Drop",
        description: "Get exclusive early access to our upcoming NFT collection",
        expires_at: "2025-04-01",
        value: 500,
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
        featured: true,
        isNew: true
      },
      {
        id: "2",
        title: "Community Moderator Role",
        description: "Become a moderator in our growing community",
        expires_at: "2025-03-28",
        value: 300,
        image: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&auto=format&fit=crop&q=60",
        featured: true,
        isNew: true
      },
      {
        id: "3",
        title: "Premium Membership",
        description: "1-year premium membership with exclusive benefits",
        expires_at: "2025-03-25",
        value: 1000,
        image: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=800&auto=format&fit=crop&q=60",
        featured: true,
        isAd: true
      },
      {
        id: "4",
        title: "Limited Edition Merch",
        description: "Exclusive merchandise only for reward holders",
        expires_at: "2025-04-15",
        value: 150,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60",
        featured: false
      },
      {
        id: "5",
        title: "VIP Gaming Tournament",
        description: "Participate in our exclusive gaming tournament with pro players",
        expires_at: "2025-04-20",
        value: 750,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
        featured: true,
        isNew: true
      },
      {
        id: "6",
        title: "Crypto Trading Course",
        description: "Learn advanced crypto trading strategies from experts",
        expires_at: "2025-04-10",
        value: 450,
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60",
        featured: true,
        isAd: true
      },
      {
        id: "7",
        title: "Exclusive Discord Access",
        description: "Join our private Discord channels with industry leaders",
        expires_at: "2025-04-05",
        value: 200,
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&auto=format&fit=crop&q=60",
        featured: false
      },
      {
        id: "8",
        title: "AI Workshop Series",
        description: "Hands-on workshops about artificial intelligence and machine learning",
        expires_at: "2025-04-30",
        value: 800,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
        featured: false
      }
    ]
  };

  const featuredRewards = testData.rewards.filter(reward => reward.featured);
  const rewards = testData.rewards;

  return json(
    { rewards, featuredRewards },
    { headers: response.headers }
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}>
      {children}
    </span>
  );
}

function RewardCard({ reward }: { reward: any }) {
  return (
    <Link to={`/campaigns/${reward.id}`} className="block h-full">
      <div className="card hover:scale-[1.02] transition-all h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800">
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
              {reward.isNew && (
                <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  New
                </Badge>
              )}
              {reward.isAd && (
                <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Ad
                </Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-slate-300 mb-4 line-clamp-2">{reward.description}</p>
        <div className="text-2xl font-bold text-[rgb(var(--primary))] mb-4">
          ${typeof reward.value === 'number' ? reward.value.toLocaleString() : '0'}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span>Expires: {new Date(reward.expires_at).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Index() {
  const { rewards, featuredRewards } = useLoaderData<typeof loader>();

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
                Stay ahead of the curve with KaitoRewards. Get early access to upcoming campaigns, 
                exclusive memberships, and unique opportunities.
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
            <h2 className="text-2xl font-bold mb-6 text-white">Featured Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRewards?.map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">All Rewards</h2>
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
              {rewards?.map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
            </div>
          </div>
        </div>
      </Lamp>
    </div>
  );
}