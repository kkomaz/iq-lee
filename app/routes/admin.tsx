import { Trophy } from 'lucide-react';

export const meta = () => {
  return [
    { title: 'Admin - Campaign Platform' },
    { name: 'description', content: 'Manage your campaigns' },
  ];
};

export default function Admin() {
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
    </div>
  );
}
