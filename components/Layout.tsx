import React, { useState, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Wine, BookOpen, Search, ChevronLeft, Bell, User as UserIcon, LogOut, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Drawer, SearchOverlay, Popover, Button } from './UI';
import { User } from '../types';

// Create User Context
export const UserContext = React.createContext<{ user: User | null; logout: () => void }>({ user: null, logout: () => {} });

export const Header: React.FC<{ title?: string; showBack?: boolean; rightAction?: React.ReactNode }> = ({ 
  title = "Demo & Dining", 
  showBack = false,
  rightAction
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const notifTriggerRef = useRef(null);
  
  const triggerSearch = () => window.dispatchEvent(new Event('open-search'));
  const triggerNotif = () => window.dispatchEvent(new Event('open-notif'));
  const triggerProfile = () => window.dispatchEvent(new Event('open-profile'));
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-safe pb-2 bg-white/95 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center justify-between h-14 pt-2">
        <div className="flex items-center gap-4">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="w-12 h-12 flex items-center justify-center -ml-3 rounded-full hover:bg-gray-100 active:scale-95 transition-transform text-dark"
            >
              <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
            </button>
          ) : (
             // If user is logged in, show Title. If generic, show Title.
             <h1 className={`font-extrabold text-dark tracking-tight text-2xl`}>
                {title}
             </h1>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {rightAction ? rightAction : (
            <>
                {/* Search */}
                <button 
                    onClick={triggerSearch} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-dark shadow-sm active:scale-95 transition-transform"
                >
                    <Search className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <button 
                    ref={notifTriggerRef}
                    onClick={triggerNotif} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-dark hover:text-primary transition-colors relative active:scale-95"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white" />
                </button>
                
                {/* Profile Avatar */}
                <button 
                    onClick={triggerProfile}
                    className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md text-sm font-bold active:scale-95 transition-transform border-2 border-white ${user?.color || 'bg-gray-200 text-gray-500'}`}
                >
                    {user ? user.initials : <UserIcon className="w-5 h-5" />}
                </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export const BottomNav: React.FC = () => {
  // NEW ORDER: Wine -> Food -> Learn
  const navItems = [
    { to: "/wine", icon: Wine },
    { to: "/food", icon: UtensilsCrossed },
    { to: "/learn", icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
      <div className="bg-white/90 backdrop-blur-2xl rounded-full px-8 py-4 flex items-center gap-10 shadow-soft ring-1 ring-black/5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              relative flex items-center justify-center transition-all duration-300
              ${isActive 
                ? 'text-primary scale-110' 
                : 'text-gray-600 hover:text-dark scale-100'}
            `}
          >
            {({ isActive }) => (
              <item.icon className="w-7 h-7" strokeWidth={isActive ? 3 : 2.5} />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen pt-28 pb-40 px-6 w-full max-w-xl mx-auto ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Global Shell for Overlays ---
export const AppShell: React.FC<{ children: React.ReactNode; user: User | null; onLogout: () => void }> = ({ children, user, onLogout }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const notifTriggerRef = useRef(null);

    React.useEffect(() => {
        const openSearch = () => setSearchOpen(true);
        const openNotif = () => setNotifOpen(true);
        const openProfile = () => setProfileOpen(true);
        window.addEventListener('open-search', openSearch);
        window.addEventListener('open-notif', openNotif);
        window.addEventListener('open-profile', openProfile);
        return () => {
            window.removeEventListener('open-search', openSearch);
            window.removeEventListener('open-notif', openNotif);
            window.removeEventListener('open-profile', openProfile);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, logout: onLogout }}>
            {children}
            
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            
            {/* Notifications Popover */}
            <Popover isOpen={notifOpen} onClose={() => setNotifOpen(false)} triggerRef={notifTriggerRef}>
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/80 backdrop-blur-xl">
                    <h3 className="font-extrabold text-sm text-dark tracking-wide">Notifications</h3>
                    <span className="text-[10px] font-bold text-white bg-primary px-2.5 py-1 rounded-full shadow-sm">4 New</span>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                    {[
                        { title: 'New Vintage Added', desc: '2022 Chablis is now in stock.', time: '2m ago', urgent: false },
                        { title: '86 Scallops', desc: 'Only 3 portions remaining.', time: '15m ago', urgent: true },
                        { title: 'Shift Update', desc: 'Team meeting at 4 PM.', time: '1h ago', urgent: false },
                        { title: 'Reservation Note', desc: 'Table 4 requires gluten free menu.', time: '2h ago', urgent: false },
                    ].map((n, i) => (
                        <div key={i} className={`p-5 border-b border-gray-50 flex gap-4 hover:bg-gray-50 transition-colors ${n.urgent ? 'bg-red-50/40' : ''}`}>
                            <div className={`w-2.5 h-2.5 mt-1.5 rounded-full shrink-0 shadow-sm ${n.urgent ? 'bg-red-500' : 'bg-primary'}`} />
                            <div>
                                <h4 className="font-bold text-dark text-sm">{n.title}</h4>
                                <p className="text-sm text-subtle mt-1 leading-snug">{n.desc}</p>
                                <span className="text-[10px] text-gray-400 font-bold mt-2 block uppercase tracking-wide">{n.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-gray-50/80 backdrop-blur-xl text-center border-t border-gray-100">
                    <button onClick={() => setNotifOpen(false)} className="text-xs font-bold text-primary w-full py-2 uppercase tracking-wider hover:opacity-70">Dismiss All</button>
                </div>
            </Popover>

            {/* Profile Drawer */}
            <Drawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} title="My Profile">
                {user ? (
                    <div className="pb-8">
                        {/* User Card */}
                        <div className="flex items-center gap-5 mb-8 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                            <div className={`w-20 h-20 rounded-full ${user.color} flex items-center justify-center text-3xl font-black shadow-sm ring-4 ring-white`}>
                                {user.initials}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-dark">{user.name}</h2>
                                <p className="text-subtle font-bold">{user.role}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-dark">Location</span>
                                </div>
                                <span className="text-sm font-medium text-subtle">{user.restaurant}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-dark">E-Learning</span>
                                </div>
                                <span className="text-sm font-medium text-subtle">{user.level}</span>
                            </div>
                        </div>

                        <Button 
                            fullWidth 
                            variant="outline" 
                            onClick={() => {
                                onLogout();
                                setProfileOpen(false);
                            }}
                            className="!border-red-100 !text-red-500 hover:!bg-red-50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p>No user logged in.</p>
                        <Button onClick={() => { onLogout(); setProfileOpen(false); }} className="mt-4">Go to Login</Button>
                    </div>
                )}
            </Drawer>
        </UserContext.Provider>
    )
}