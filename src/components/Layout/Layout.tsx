import { Outlet } from 'react-router-dom';
import AnimatedBackground from '../AnimatedBackground';
import CursorGlow from '../CursorGlow';

export default function Layout() {
  return (
    <div className="min-h-screen bg-dark text-text-primary relative overflow-x-hidden ">
      <AnimatedBackground />
      <CursorGlow />
      <div className="relative z-10 max-w-lg mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
