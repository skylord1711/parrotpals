import { motion } from 'framer-motion';
import { Link2, ExternalLink } from 'lucide-react';
import type { SocialPlatform } from '../../types';

interface SocialLinksEditorProps {
  platforms: SocialPlatform[];
  onUpdate: (platforms: SocialPlatform[]) => void;
}

export default function SocialLinksEditor({ platforms, onUpdate }: SocialLinksEditorProps) {
  const handleChange = (index: number, field: keyof SocialPlatform, value: string | number | boolean) => {
    const updated = [...platforms];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10">
            <Link2 size={18} className="text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white">Social Links</h3>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
        {platforms.map((platform, index) => (
          <div key={platform.id} className="p-4 rounded-xl bg-white/5 space-y-3">
            <div className="flex items-center gap-2">
              <ExternalLink size={14} className="text-purple-400" />
              <span className="text-sm font-medium text-white capitalize">{platform.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Username</label>
                <input
                  type="text"
                  value={platform.username}
                  onChange={(e) => handleChange(index, 'username', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">URL</label>
                <input
                  type="text"
                  value={platform.url}
                  onChange={(e) => handleChange(index, 'url', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500/50 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Description</label>
              <input
                type="text"
                value={platform.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
