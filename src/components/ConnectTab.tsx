import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Server, Copy, Check, Users, Heart, Gamepad2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useToast } from './Toast';
import ModApplicationForm from './ModApplicationForm';
import type { ConnectSettings } from '../types';

const iconMap: Record<string, React.ElementType> = {
  'message-circle': MessageCircle,
  users: Users,
  heart: Heart,
  gamepad: Gamepad2,
};

interface ConnectTabProps {
  settings: ConnectSettings;
}

export default function ConnectTab({ settings }: ConnectTabProps) {
  const { showToast } = useToast();
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);

  const handleCopy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const Button1Icon = iconMap[settings.button1Icon] || MessageCircle;
  const Button2Icon = iconMap[settings.button2Icon] || Users;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="connect"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="px-4 pb-8 space-y-4"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 gradient-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10">
              <Heart size={20} className="text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white text-lg">{settings.welcomeTitle}</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-5">
            {settings.welcomeMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl glass glass-hover text-white text-sm transition-all hover:shadow-lg active:scale-95">
              <Button1Icon size={16} className="text-purple-400" />
              {settings.button1Text}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl glass glass-hover text-white text-sm transition-all hover:shadow-lg active:scale-95">
              <Button2Icon size={16} className="text-cyan-400" />
              {settings.button2Text}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 gradient-border"
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.05), rgba(168,85,247,0.05))',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-green-500/10">
              <Gamepad2 size={20} className="text-green-400" />
            </div>
            <h3 className="font-semibold text-white text-lg">{settings.realmSectionTitle}</h3>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Status</span>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {settings.serverStatus}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Java IP</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-lg">
                  {settings.serverIP}
                </code>
                <button
                  onClick={() => handleCopy(settings.serverIP, setCopiedJava)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Copy Java IP"
                >
                  {copiedJava ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-gray-400" />
                <span className="text-sm text-gray-300">Bedrock IP</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-lg">
                  {settings.serverIP}:{settings.bedrockPort}
                </code>
                <button
                  onClick={() => handleCopy(`${settings.serverIP}:${settings.bedrockPort}`, setCopiedBedrock)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Copy Bedrock IP"
                >
                  {copiedBedrock ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 flex items-center gap-2 text-xs text-gray-400">
            <MessageSquare size={14} />
            <span>{settings.supportMessage}</span>
          </div>
        </motion.div>

        <ModApplicationForm />
      </motion.div>
    </AnimatePresence>
  );
}
