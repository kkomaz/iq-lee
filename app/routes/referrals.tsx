import { json, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { Copy, Link, Trophy } from "lucide-react";

export const meta = () => {
  return [
    { title: "My Referrals - Rewards Platform" },
    { name: "description", content: "Manage your referral codes" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const { data: referralCodes } = await supabase
    .from('referral_codes')
    .select(`
      *,
      referral_uses (
        id,
        referred_user_id,
        created_at
      )
    `)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return json(
    { referralCodes },
    { headers: response.headers }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const formData = await request.formData();
  const maxUses = formData.get("maxUses") ? parseInt(formData.get("maxUses") as string) : null;
  const expiresAt = formData.get("expiresAt") as string || null;

  // Generate a unique referral code
  const code = `${session.user.id.slice(0, 6)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();

  const { error } = await supabase
    .from('referral_codes')
    .insert({
      user_id: session.user.id,
      code,
      max_uses: maxUses,
      expires_at: expiresAt
    });

  if (error) {
    return json(
      { error: error.message },
      { status: 400, headers: response.headers }
    );
  }

  return json(
    { success: true },
    { headers: response.headers }
  );
}

export default function Referrals() {
  const { referralCodes } = useLoaderData<typeof loader>();

  const copyToClipboard = (code: string) => {
    const url = `${window.location.origin}/signup?ref=${code}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-[#2d2d2d] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[rgb(var(--primary))]" />
            <span className="text-xl font-bold">My Referrals</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Referral Codes</h1>
          <Form method="post">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--primary))] text-[#1d1d1d] rounded-lg font-medium hover:opacity-90"
            >
              <Link className="w-4 h-4" />
              Generate New Code
            </button>
          </Form>
        </div>

        <div className="grid gap-6">
          {referralCodes?.map((referral) => (
            <div key={referral.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold font-mono">{referral.code}</h3>
                    <button
                      onClick={() => copyToClipboard(referral.code)}
                      className="p-1 hover:bg-[#3d3d3d] rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-400">
                    Uses: {referral.uses}{referral.max_uses ? `/${referral.max_uses}` : ''} · 
                    Created: {new Date(referral.created_at).toLocaleDateString()}
                    {referral.expires_at && ` · Expires: ${new Date(referral.expires_at).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
              {referral.referral_uses.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#3d3d3d]">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Recent Signups</h4>
                  <div className="space-y-2">
                    {referral.referral_uses.map((use) => (
                      <div key={use.id} className="text-sm">
                        {new Date(use.created_at).toLocaleDateString()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}