import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Shield, Ban } from 'lucide-react';

interface ModApplicationFormProps {
  bannedUsers: string[];
}

export default function ModApplicationForm({ bannedUsers }: ModApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [banned, setBanned] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    discord: '',
    timezone: '',
    available: '',
    streams: '',
    abuse: '',
    experience: '',
    reason: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const identifier = `${formData.name.toLowerCase()}|${formData.discord.toLowerCase()}`;
    if (bannedUsers.some((b) => identifier.includes(b.toLowerCase()))) {
      setBanned(true);
      return;
    }

    try {
      const res = await fetch('/api/send-mod-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    }
  };

  if (banned) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-6 gradient-border text-center"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <Ban size={28} className="text-red-400" />
        </div>
        <h3 className="font-semibold text-white text-lg mb-1">Application Not Accepted</h3>
        <p className="text-sm text-gray-400">You are not eligible to apply at this time.</p>
      </motion.div>
    );
  }

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

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder-gray-500";
  const labelClass = "block text-xs text-gray-400 mb-1.5";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
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
            <label className={labelClass}>Name</label>
            <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className={inputClass} placeholder="Your name" required />
          </div>
          <div>
            <label className={labelClass}>Age</label>
            <input type="number" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} className={inputClass} placeholder="Your age" required min={13} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Discord</label>
            <input type="text" value={formData.discord} onChange={(e) => handleChange('discord', e.target.value)} className={inputClass} placeholder="user#0000" required />
          </div>
          <div>
            <label className={labelClass}>Timezone</label>
            <input type="text" value={formData.timezone} onChange={(e) => handleChange('timezone', e.target.value)} className={inputClass} placeholder="EST, PST, etc." required />
          </div>
        </div>

        <div>
          <label className={labelClass}>What time are you available during your timezone?</label>
          <input type="text" value={formData.available} onChange={(e) => handleChange('available', e.target.value)} className={inputClass} placeholder="e.g. Evenings after 5PM, weekends" required />
        </div>

        <div>
          <label className={labelClass}>What streams do you usually watch?</label>
          <textarea value={formData.streams} onChange={(e) => handleChange('streams', e.target.value)} rows={2} className={inputClass + " resize-none"} placeholder="Which streamers or content?" required />
        </div>

        <div>
          <label className={labelClass}>What would you do if another mod abused power?</label>
          <textarea value={formData.abuse} onChange={(e) => handleChange('abuse', e.target.value)} rows={2} className={inputClass + " resize-none"} placeholder="How would you handle it?" required />
        </div>

        <div>
          <label className={labelClass}>Moderation Experience</label>
          <textarea value={formData.experience} onChange={(e) => handleChange('experience', e.target.value)} rows={2} className={inputClass + " resize-none"} placeholder="Any past mod experience..." />
        </div>

        <div>
          <label className={labelClass}>Why do you want to be a mod?</label>
          <textarea value={formData.reason} onChange={(e) => handleChange('reason', e.target.value)} rows={2} className={inputClass + " resize-none"} placeholder="Tell us why..." required />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
        >
          <Send size={16} />
          Submit Application
        </motion.button>
      </form>
    </motion.div>
  );
}
