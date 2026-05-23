import { motion } from 'framer-motion';

export default function LiveBadge() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.3 }}
      className="relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30"
    >
      <span className="relative flex h-2.5 w-2.5">
        <motion.span
          className="absolute inset-0 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
      </span>
      <span className="text-xs font-bold text-red-400 uppercase tracking-wider">LIVE</span>
    </motion.div>
  );
}
