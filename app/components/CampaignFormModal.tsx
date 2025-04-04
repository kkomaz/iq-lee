// components/CampaignFormModal.tsx
import React, { useEffect, useState } from 'react';
import { Form } from '@remix-run/react';

export function CampaignFormModal({
  open,
  onClose,
  campaign,
  userId,
  actionData,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
    } else {
      setFormData({});
    }
  }, [campaign]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl p-6 relative border border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold text-white mb-6">
          {campaign ? 'Edit Campaign' : 'Create Campaign'}
        </h3>
        <Form method="post" className="space-y-6">
          <input type="hidden" name="userId" value={userId} />
          {campaign && <input type="hidden" name="id" value={campaign.id} />}
          <input
            type="hidden"
            name="intent"
            value={campaign ? 'update' : 'create'}
          />

          <div>
            <label
              htmlFor="title"
              className="block text-slate-300 text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={campaign?.title}
              className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
              placeholder="Campaign title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-slate-300 text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={campaign?.description}
              rows={3}
              className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
              placeholder="Short description"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex gap-2 items-center text-slate-300">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={campaign?.featured}
              />{' '}
              Featured
            </label>
            <label className="flex gap-2 items-center text-slate-300">
              <input
                type="checkbox"
                name="isAd"
                defaultChecked={campaign?.isAd}
              />{' '}
              Ad
            </label>
            <label className="flex gap-2 items-center text-slate-300">
              <input
                type="checkbox"
                name="isNew"
                defaultChecked={campaign?.isNew}
              />{' '}
              New
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[rgb(var(--primary))] text-slate-950 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
            >
              {campaign ? 'Update Campaign' : 'Create Campaign'}
            </button>
          </div>

          {actionData?.error && (
            <p className="text-red-400 text-sm text-center">
              {actionData.error}
            </p>
          )}
          {actionData?.success && (
            <p className="text-emerald-400 text-sm text-center">
              {actionData.success}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}
