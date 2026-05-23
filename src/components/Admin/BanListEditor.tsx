import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ban, Plus, Trash2 } from 'lucide-react';
import { useToast } from '../Toast';

interface BanListEditorProps {
  bannedUsers: string[];
  onUpdate: (banned: string[]) => void;
}

export default function BanListEditor({ bannedUsers, onUpdate }: BanListEditorProps) {
  const { showToast } = useToast();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (bannedUsers.includes(trimmed)) {
      showToast('Already in ban list', 'error');
      return;
    }
    onUpdate([...bannedUsers, trimmed]);
    setInput('');
    showToast('User banned from applying');
  };

  const handleRemove = (identifier: string) => {
    onUpdate(bannedUsers.filter((b) => b !== identifier));
    showToast('Ban removed');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-red-500/10">
          <Ban size={18} className="text-red-400" />
        </div>
        <h3 className="font-semibold text-white">Ban List</h3>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
          className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500/50 placeholder-gray-500"
          placeholder="Name or Discord#0000"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 rounded-xl bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-all"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {bannedUsers.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-3">No banned users</p>
        )}
        {bannedUsers.map((identifier) => (
          <div key={identifier} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
            <span className="text-sm text-gray-300">{identifier}</span>
            <button
              onClick={() => handleRemove(identifier)}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
