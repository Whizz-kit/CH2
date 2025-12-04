import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NumPad } from '../components/UI';
import { ChevronRight } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Mock users with specific roles and levels
const users: User[] = [
    { id: 1, name: "Jade W.", role: "Sommelier", initials: "JW", color: "bg-emerald-100 text-emerald-700", restaurant: "Restaurant De Demo", level: "Level 3" },
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNumPress = (num: string) => {
      if (accessCode.length < 4) {
          setAccessCode(prev => prev + num);
      }
  };

  const handleDelete = () => {
      setAccessCode(prev => prev.slice(0, -1));
  };

  const handleLogin = () => {
    setLoading(true);
    const userObj = users.find(u => u.id === selectedUser);
    
    setTimeout(() => {
      setLoading(false);
      if (userObj) {
          onLogin(userObj);
          navigate('/wine');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-6 bg-[#F8F8F8] overflow-hidden">
      
      {/* Light Background Ambience */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px] opacity-60" />
      </div>

      <motion.div 
        layout
        className="relative z-10 w-full max-w-md flex flex-col items-center"
      >
        <div className="mb-16 text-center w-full flex justify-center">
            {/* Logo Image */}
            <img 
              src="https://www.dropbox.com/scl/fi/xncsxn1z64k9ns1b7glrz/CleverHoreca.png?rlkey=wnbv4t5kc9spwl8pfp9mfa8jr&raw=1" 
              alt="Clever Horeca" 
              className="h-12 object-contain mx-auto"
            />
        </div>

        <AnimatePresence mode="wait">
            {!selectedUser ? (
                /* STEP 1: SELECT USER */
                <motion.div 
                    key="user-select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full"
                >
                    <p className="text-center text-gray-400 mb-8 text-sm font-bold uppercase tracking-widest">Select Profile</p>
                    <div className="flex justify-center gap-6">
                        {users.map((user, i) => (
                            <motion.button
                                key={user.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedUser(user.id)}
                                className="flex flex-col items-center gap-4 group"
                            >
                                <div className={`w-24 h-24 rounded-full ${user.color} flex items-center justify-center text-2xl font-black shadow-sm ring-4 ring-transparent group-hover:ring-white group-hover:shadow-md transition-all`}>
                                    {user.initials}
                                </div>
                                <div className="text-center">
                                    <div className="text-dark font-bold text-base">{user.name}</div>
                                    <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-1">{user.role}</div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            ) : (
                /* STEP 2: ENTER PIN */
                <motion.div 
                    key="pin-entry"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="w-full"
                >
                    <div className="flex items-center justify-between mb-10 px-4">
                        <button onClick={() => { setSelectedUser(null); setAccessCode(''); }} className="text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-dark flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 rotate-180" /> Switch User
                        </button>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                             <div className={`w-5 h-5 rounded-full ${users.find(u => u.id === selectedUser)?.color} flex items-center justify-center text-[8px] font-bold`}>
                                 {users.find(u => u.id === selectedUser)?.initials}
                             </div>
                             <span className="text-dark font-bold text-sm">{users.find(u => u.id === selectedUser)?.name}</span>
                        </div>
                    </div>

                    {/* PIN Display Dots */}
                    <div className="flex justify-center gap-6 mb-10">
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div 
                                key={i}
                                animate={{ 
                                    scale: i < accessCode.length ? 1.3 : 1,
                                    backgroundColor: i < accessCode.length ? "#1819FF" : "#E5E7EB",
                                }}
                                className="w-4 h-4 rounded-full transition-all duration-300"
                            />
                        ))}
                    </div>

                    <NumPad onPress={handleNumPress} onDelete={handleDelete} disabled={loading} />

                    <div className="mt-10 px-10">
                         <Button 
                            fullWidth 
                            onClick={handleLogin}
                            disabled={accessCode.length < 4 || loading}
                            className={accessCode.length === 4 ? "!bg-primary !text-white !shadow-md" : "!bg-gray-200 !text-gray-400"}
                         >
                            {loading ? "Authenticating..." : "Enter Terminal"}
                         </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default Login;