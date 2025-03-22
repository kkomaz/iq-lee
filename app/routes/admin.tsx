import { json, LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { AlertCircle, ChevronDown, ChevronUp, Plus, Trophy } from "lucide-react";
import { useState } from "react";

export const meta = () => {
  return [
    { title: "Admin - Campaign Platform" },
    { name: "description", content: "Manage your campaigns" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }

  const { data: campaigns, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching campaigns:", error);
    return json(
      { campaigns: [], error: error.message },
      { headers: response.headers }
    );
  }

  return json(
    { campaigns: campaigns || [] },
    { headers: response.headers }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    const id = formData.get("id") as string;
    const { error } = await supabase
      .from("campaigns")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

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

  if (intent === "create" || intent === "update") {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const longDescription = formData.get("longDescription") as string;
    const distributionDetails = formData.get("distributionDetails") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const rewardAmount = formData.get("rewardAmount") as string;
    const isFeatured = formData.get("isFeatured") === "on";
    const isNew = formData.get("isNew") === "on";
    const isSponsored = formData.get("isSponsored") === "on";
    const expiresAt = formData.get("expiresAt") as string || null;
    const tags = formData.get("tags") as string;

    // Convert comma-separated tags to array
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);

    const campaignData = {
      user_id: session.user.id,
      title,
      description,
      long_description: longDescription,
      distribution_details: distributionDetails,
      image_url: imageUrl,
      reward_amount: rewardAmount,
      is_featured: isFeatured,
      is_new: isNew,
      is_sponsored: isSponsored,
      expires_at: expiresAt,
      tags: tagsArray
    };

    if (intent === "create") {
      const { error } = await supabase
        .from("campaigns")
        .insert([campaignData]);

      if (error) {
        return json(
          { error: error.message },
          { status: 400, headers: response.headers }
        );
      }
    } else {
      const { error } = await supabase
        .from("campaigns")
        .update(campaignData)
        .eq("id", id)
        .eq("user_id", session.user.id);

      if (error) {
        return json(
          { error: error.message },
          { status: 400, headers: response.headers }
        );
      }
    }

    return json(
      { success: true },
      { headers: response.headers }
    );
  }

  return json(
    { error: "Invalid action" },
    { status: 400, headers: response.headers }
  );
}

function CampaignForm({ campaign = null, onCancel }: { campaign?: any; onCancel?: () => void }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="space-y-6">
      <input type="hidden" name="intent" value={campaign ? "update" : "create"} />
      {campaign && <input type="hidden" name="id" value={campaign.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={campaign?.title}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            defaultValue={campaign?.image_url}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Short Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={campaign?.description}
            rows={2}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          />
        </div>

        <div>
          <label htmlFor="rewardAmount" className="block text-sm font-medium mb-1">
            Reward Amount *
          </label>
          <input
            type="text"
            id="rewardAmount"
            name="rewardAmount"
            required
            defaultValue={campaign?.reward_amount}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="longDescription" className="block text-sm font-medium mb-1">
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            defaultValue={campaign?.long_description}
            rows={4}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="distributionDetails" className="block text-sm font-medium mb-1">
            Distribution Details
          </label>
          <textarea
            id="distributionDetails"
            name="distributionDetails"
            defaultValue={campaign?.distribution_details}
            rows={4}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            defaultValue={campaign?.tags ? campaign.tags.join(", ") : ""}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
            placeholder="nft, gaming, crypto"
          />
        </div>

        <div>
          <label htmlFor="expiresAt" className="block text-sm font-medium mb-1">
            Expiry Date
          </label>
          <input
            type="datetime-local"
            id="expiresAt"
            name="expiresAt"
            defaultValue={campaign?.expires_at ? new Date(campaign.expires_at).toISOString().slice(0, 16) : ""}
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))]"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={campaign?.is_featured}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]"
            />
            <span className="text-sm">Featured</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isNew"
              defaultChecked={campaign?.is_new ?? true}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]"
            />
            <span className="text-sm">New</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isSponsored"
              defaultChecked={campaign?.is_sponsored}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-[rgb(var(--primary))]"
            />
            <span className="text-sm">Sponsored</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-[rgb(var(--primary))] text-slate-950 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {isSubmitting ? (campaign ? "Updating..." : "Creating...") : (campaign ? "Update Campaign" : "Create Campaign")}
        </button>
      </div>
    </Form>
  );
}

export default function Admin() {
  const { campaigns } = useLoaderData<typeof loader>();
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const submit = useSubmit();

  const handleDelete = (campaign: any) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      const formData = new FormData();
      formData.append("intent", "delete");
      formData.append("id", campaign.id);
      submit(formData, { method: "post" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[rgb(var(--primary))]" />
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {editingCampaign ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Edit Campaign</h2>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
              <CampaignForm 
                campaign={editingCampaign} 
                onCancel={() => setEditingCampaign(null)} 
              />
            </div>
          </div>
        ) : (
          <div className="mb-12">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 text-2xl font-bold mb-6"
            >
              Create New Campaign
              {showCreateForm ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
            {showCreateForm && (
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
                <CampaignForm />
              </div>
            )}
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-6">Your Campaigns</h2>
          <div className="grid gap-6">
            {campaigns?.map((campaign) => (
              <div key={campaign.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{campaign.title}</h3>
                      {campaign.is_featured && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                          Featured
                        </span>
                      )}
                      {campaign.is_new && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500">
                          New
                        </span>
                      )}
                      {campaign.is_sponsored && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-500">
                          Sponsored
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mb-4">{campaign.description}</p>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span>Reward: ${campaign.reward_amount}</span>
                      {campaign.expires_at && (
                        <>
                          <span>•</span>
                          <span>Expires: {new Date(campaign.expires_at).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCampaign(campaign)}
                      className="px-3 py-1 bg-slate-800 text-white rounded hover:bg-slate-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(campaign)}
                      className="px-3 py-1 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {campaigns?.length === 0 && (
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 flex items-center justify-center gap-3 text-slate-400">
                <AlertCircle className="w-5 h-5" />
                <span>No campaigns found. Create your first campaign above!</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}