import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { ConnectSettings } from '../../types';

interface ConnectSettingsEditorProps {
  settings: ConnectSettings;
  onUpdate: (settings: ConnectSettings) => void;
}

export default function ConnectSettingsEditor({ settings, onUpdate }: ConnectSettingsEditorProps) {
  const handleChange = (field: keyof ConnectSettings, value: string) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-cyan-500/10">
          <Heart size={18} className="text-cyan-400" />
        </div>
        <h3 className="font-semibold text-white">Connect Tab Content</h3>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
        <div>
          <label className="block text-sm text-gray-300 mb-1.5">Welcome Title</label>
          <input
            type="text"
            value={settings.welcomeTitle}
            onChange={(e) => handleChange('welcomeTitle', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1.5">Welcome Message</label>
          <textarea
            value={settings.welcomeMessage}
            onChange={(e) => handleChange('welcomeMessage', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none placeholder-gray-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Button 1 Text</label>
            <input
              type="text"
              value={settings.button1Text}
              onChange={(e) => handleChange('button1Text', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Button 2 Text</label>
            <input
              type="text"
              value={settings.button2Text}
              onChange={(e) => handleChange('button2Text', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>
        <div className="border-t border-white/5 pt-4">
          <p className="text-xs text-gray-500 mb-3 font-medium">Minecraft Server</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Section Title</label>
              <input
                type="text"
                value={settings.realmSectionTitle}
                onChange={(e) => handleChange('realmSectionTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Server IP</label>
              <input
                type="text"
                value={settings.serverIP}
                onChange={(e) => handleChange('serverIP', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Bedrock Port</label>
              <input
                type="text"
                value={settings.bedrockPort}
                onChange={(e) => handleChange('bedrockPort', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Status Text</label>
              <input
                type="text"
                value={settings.serverStatus}
                onChange={(e) => handleChange('serverStatus', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Support Message</label>
              <input
                type="text"
                value={settings.supportMessage}
                onChange={(e) => handleChange('supportMessage', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
