// app/components/LongDescriptionEditor.tsx
import { useState, useEffect, Suspense, lazy } from 'react';

// Dynamically import react-quill client-side
const ReactQuill = lazy(() => import('react-quill'));

interface LongDescriptionEditorProps {
  initialValue?: string;
  name?: string; // For Remix form compatibility
}

export default function LongDescriptionEditor({
  initialValue = '',
  name = 'longDescription',
}: LongDescriptionEditorProps) {
  const [value, setValue] = useState(initialValue);

  // Sync with initialValue when it changes (e.g., when editingCampaign changes)
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
      <Suspense
        fallback={
          <textarea
            disabled
            className="w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700"
            placeholder="Loading editor..."
          />
        }
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Enter detailed description"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
          }}
        />
      </Suspense>
      {/* Hidden input to include value in Remix form submission */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
