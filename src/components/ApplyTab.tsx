import { AnimatePresence, motion } from 'framer-motion';
import ModApplicationForm from './ModApplicationForm';

interface ApplyTabProps {
  bannedUsers: string[];
}

export default function ApplyTab({ bannedUsers }: ApplyTabProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="apply"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="px-4 pb-8"
      >
        <ModApplicationForm bannedUsers={bannedUsers} />
      </motion.div>
    </AnimatePresence>
  );
}
