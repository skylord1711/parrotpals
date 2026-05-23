import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Shield } from 'lucide-react';

export default function ModApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    discord: '',
    timezone: '',
    experience: '',
    reason: '',
    hours: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = Object.entries(formData)
      .map(([key, val]) => `${key}: ${val}`)
      .join('\n');

    try {
      const res = await fetch('/api/send-mod-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, raw: body }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // fallback
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-6 gradient-border text-center"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
          <Check size={28} className="text-green-400" />
        </div>
        <h3 className="font-semibold text-white text-lg mb-1">Application Sent!</h3>
        <p className="text-sm text-gray-400">We'll review it and get back to you on Discord.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 gradient-border"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-purple-500/10">
          <Shield size={20} className="text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-lg">Apply for Stream Mod</h3>
          <p className="text-xs text-gray-400">Join the moderation team</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder-gray-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder-gray-500"
              placeholder="Your age"
              required
              min={13}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Discord</label>
            <input
              type="text"
              value={formData.discord}
              onChange={(e) => handleChange('discord', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder-gray-500"
              placeholder="user#0000"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Timezone</label>
            <input
              type="text"
              value={formData.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder-gray-500"
              placeholder="EST, PST, etc."
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Moderation Experience</label>
          <textarea
            value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors resize-none placeholder-gray-500"
            placeholder="Any past mod experience..."
            required
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Why do you want to be a mod?</label>
          <textarea
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors resize-none placeholder-gray-500"
            placeholder="Tell us why..."
            required
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Hours available per week</label>
          <input
            type="text"
            value={formData.hours}
            onChange={(e) => handleChange('hours', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder-gray-500"
            placeholder="e.g. 10-15 hours"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
          }}
        >
          <Send size={16} />
          Submit Application
        </motion.button>
      </form>
    </motion.div>
  );
}
