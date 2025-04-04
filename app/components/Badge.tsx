// components/Badge.tsx
import React from 'react';

export function Badge({ type }: { type: 'featured' | 'ad' | 'new' }) {
  const config = {
    featured: {
      label: 'Featured',
      className: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
    },
    ad: {
      label: 'Ad',
      className: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
    },
    new: {
      label: 'New',
      className:
        'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
    },
  };

  const { label, className } = config[type];

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}
    >
      {label}
    </span>
  );
}
