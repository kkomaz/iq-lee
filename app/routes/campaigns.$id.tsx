import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { ArrowLeft, Clock, Trophy } from "lucide-react";

export const meta = () => {
  return [
    { title: "Campaign Details - KaitoRewards" },
    { name: "description", content: "Learn more about this campaign and how to participate" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );

  // For now using test data - would be replaced with actual DB query
  const testData = {
    rewards: [
      {
        id: "1",
        title: "Early Access NFT Drop",
        description: "Get exclusive early access to our upcoming NFT collection",
        longDescription: "Full details about the NFT drop...",
        distribution: "Distribution details...",
        expires_at: "2025-04-01",
        value: 500,
        featured: false
      },
      {
        id: "2",
        title: "Community Moderator Role",
        description: "Become a moderator in our growing community",
        longDescription: "Full details about the moderator role...",
        distribution: "Distribution details...",
        expires_at: "2025-03-28",
        value: 300,
        featured: false
      },
      {
        id: "3",
        title: "Premium Membership",
        description: "1-year premium membership with exclusive benefits",
        longDescription: `Join our exclusive premium membership program and unlock a world of benefits. As a premium member, you'll get:

    • Early access to new features
    • Exclusive discord channels
    • Monthly virtual events
    • Priority support
    • Special merchandise discounts`,
        distribution: `Rewards will be distributed in the following manner:

    1. All qualified participants will receive an email with redemption instructions
    2. Premium membership activation codes will be sent within 24 hours of qualification
    3. Discord role access will be granted automatically
    4. Merchandise discount codes will be distributed monthly`,
        expires_at: "2025-03-25",
        value: 1000,
        featured: true
      },
      {
        id: "4",
        title: "Limited Edition Merch",
        description: "Exclusive merchandise only for reward holders",
        longDescription: "Full details about the merchandise...",
        distribution: "Distribution details...",
        expires_at: "2025-04-15",
        value: 150,
        featured: true
      },
    ]
  };

  const campaign = testData.rewards.find(reward => reward.id === params.id);

  if (!campaign) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(
    { campaign },
    { headers: response.headers }
  );
}

export default function CampaignDetail() {
  const { campaign } = useLoaderData<typeof loader>();

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
            <div className="w-16 h-16 bg-slate-900/50 rounded-full flex items-center justify-center border-2 border-[rgb(var(--primary))]">
              <Trophy className="w-8 h-8 text-[rgb(var(--primary))]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{campaign.title}</h1>
              <p className="text-slate-400 mt-2">{campaign.description}</p>
            </div>
          </div>
          <div className="bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-2xl font-bold">${campaign.value.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">About This Campaign</h2>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-slate-300">{campaign.longDescription}</pre>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Reward Distribution</h2>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-slate-300">{campaign.distribution}</pre>
                </div>
              </section>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 rounded-xl p-6 sticky top-8">
              <div className="flex items-center gap-2 text-slate-400 mb-6">
                <Clock className="w-5 h-5" />
                <span>Expires: {new Date(campaign.expires_at).toLocaleDateString()}</span>
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