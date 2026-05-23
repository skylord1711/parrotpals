import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveBadge from './LiveBadge';

export default function ProfileHeader({ isLive }: { isLive: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center pt-12 pb-6 px-4">
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/control')}
        className="absolute top-4 right-4 p-2.5 rounded-xl glass glass-hover text-gray-400 hover:text-white transition-colors"
        aria-label="Admin settings"
      >
        <Settings size={20} />
      </motion.button>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="relative mb-5"
      >
        <div className={`relative rounded-full p-1 ${isLive ? 'animate-glow-pulse' : ''}`}
          style={{
            background: isLive
              ? 'linear-gradient(135deg, #a855f7, #22d3ee)'
              : 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.3))',
          }}
        >
          <div className="rounded-full overflow-hidden w-28 h-28 border-2 border-dark">
            <img
              src="https://i.imgur.com/F84OUB1.jpeg"
              alt="Parrot Pals profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isLive && (
            <motion.span
              className="absolute -inset-2 rounded-full border-2 border-red-500/40"
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white mb-1"
      >
        Parrot Pals
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-sm mb-4"
      >
        Gaming streamer & content creator
      </motion.p>

      {isLive && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <LiveBadge />
        </motion.div>
      )}
    </div>
  );
}
