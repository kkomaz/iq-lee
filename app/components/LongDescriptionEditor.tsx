import { useState, useEffect } from 'react';

interface LongDescriptionEditorProps {
  initialValue?: string;
  name?: string; // For Remix form compatibility
}

export default function LongDescriptionEditor({
  initialValue = '',
  name = 'longDescription',
}: LongDescriptionEditorProps) {
  const [value, setValue] = useState(initialValue);

  // Sync initialValue when it changes (e.g., when editingCampaign changes)
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <label
        htmlFor="longDescription"
        className="block text-slate-300 text-sm font-medium mb-2"
      >
        Long Description
      </label>
      <textarea
        id="longDescription"
        name={name} // Ensure this matches the form field name expected by the server
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-[rgb(var(--primary))] transition-all placeholder-slate-500"
        placeholder="Enter detailed description"
        rows={5}
      />
    </div>
  );
}
