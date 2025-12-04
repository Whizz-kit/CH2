import React, { useState } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { Delete, X, Search, ChevronRight, Image as ImageIcon } from 'lucide-react';

// --- Image Fallback Component ---
export const ImageWithFallback: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-gray-300 ${className}`}>
        <ImageIcon className="w-1/3 h-1/3 max-w-[40px] max-h-[40px]" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "",
  onClick,
  glass = false,
  ...props
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        rounded-[2rem] p-6 transition-all duration-300 relative overflow-hidden border
        ${glass 
          ? 'bg-white/90 backdrop-blur-2xl border-white/60 shadow-sm' 
          : 'bg-white border-transparent shadow-soft'}
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; type?: 'default' | 'outline' | 'primary' | 'diet' | 'flavor' }> = ({ 
  children, 
  type = 'default' 
}) => {
  const styles = {
    default: "bg-gray-100 text-subtle border border-transparent",
    outline: "border border-gray-200 text-subtle bg-transparent",
    primary: "bg-primary/10 text-primary border border-primary/20",
    diet: "bg-emerald-50 text-emerald-700 border border-emerald-100/50",
    flavor: "bg-amber-50 text-amber-700 border border-amber-100/50"
  };

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${styles[type]}`}>
      {children}
    </span>
  );
};

export const ProgressBar: React.FC<{ progress: number; className?: string }> = ({ progress, className = "" }) => (
    <div className={`h-2 w-full bg-gray-100 rounded-full overflow-hidden ${className}`}>
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
        />
    </div>
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="mb-6 px-1 mt-4 flex justify-between items-end">
    <div>
        <h2 className="text-xl font-extrabold text-dark tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-subtle mt-1 font-medium">{subtitle}</p>}
    </div>
    {action}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = "", 
  ...props 
}) => {
  const baseStyles = "relative py-4 px-8 rounded-full font-bold text-sm tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    primary: "bg-primary text-white active:scale-[0.98] shadow-md",
    secondary: "bg-dark text-white hover:bg-black active:scale-[0.98]",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "bg-transparent text-subtle hover:text-dark hover:bg-gray-100/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; icon?: React.ReactNode }> = ({ label, icon, className = "", ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-xs font-bold text-subtle tracking-wider mb-2 ml-4">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input 
          className={`
            w-full bg-white h-14 rounded-[2rem] border border-transparent shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            text-dark font-medium placeholder:text-gray-400 transition-all
            ${icon ? 'pl-12 pr-6' : 'px-6'}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

// --- Custom NumPad for POS feel ---
export const NumPad: React.FC<{ onPress: (val: string) => void; onDelete: () => void; disabled?: boolean }> = ({ onPress, onDelete, disabled }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

    return (
        <div className="grid grid-cols-3 gap-4 max-w-[300px] mx-auto">
            {keys.map((key) => {
                if (key === '') return <div key="empty" />;
                if (key === 'del') return (
                    <button 
                        key="del" 
                        onClick={onDelete}
                        className="h-20 w-20 rounded-full flex items-center justify-center text-dark hover:bg-gray-100 active:bg-gray-200 transition-colors mx-auto"
                    >
                        <Delete className="w-6 h-6" />
                    </button>
                );
                return (
                    <button
                        key={key}
                        onClick={() => !disabled && onPress(key)}
                        disabled={disabled}
                        className="h-20 w-20 rounded-full bg-white text-dark text-2xl font-bold flex items-center justify-center shadow-sm border border-gray-100 active:scale-95 transition-all mx-auto"
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    );
}

// --- Drawer (Bottom Sheet) ---
interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-[60]"
                    />
                    
                    {/* Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] bg-secondary rounded-t-[2.5rem] shadow-2xl max-h-[90vh] flex flex-col"
                    >
                        <div className="flex items-center justify-between p-8 border-b border-gray-200/50">
                             <h3 className="text-xl font-extrabold text-dark tracking-tight">{title}</h3>
                             <button onClick={onClose} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-dark hover:bg-gray-100">
                                 <X className="w-5 h-5" />
                             </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 pb-safe">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// --- Popover (For Notifications) ---
export const Popover: React.FC<{ isOpen: boolean; onClose: () => void; triggerRef: React.RefObject<HTMLElement | null>; children: React.ReactNode }> = ({ isOpen, onClose, triggerRef, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                     <div className="fixed inset-0 z-[60]" onClick={onClose} />
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        style={{ 
                            position: 'fixed', 
                            top: 70, 
                            right: 24,
                            transformOrigin: 'top right'
                        }}
                        className="z-[70] w-80 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-deep border border-white/50 overflow-hidden ring-1 ring-black/5"
                     >
                         {children}
                     </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// --- Global Search Overlay ---
export const SearchOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[80] bg-secondary/95 backdrop-blur-xl flex flex-col"
                >
                     <div className="px-6 pt-safe pb-4 border-b border-gray-200/50 flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                            <input 
                                autoFocus
                                placeholder="Search dishes, wines, allergens..."
                                className="w-full bg-white h-14 rounded-full pl-14 pr-6 text-lg font-medium focus:outline-none shadow-deep text-dark placeholder:text-gray-400 focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button onClick={onClose} className="font-bold text-dark text-sm px-4">Cancel</button>
                     </div>

                     <div className="flex-1 overflow-y-auto p-6">
                        <h4 className="text-xs font-bold text-subtle uppercase tracking-wider mb-6 pl-2">Recent Searches</h4>
                        <div className="space-y-3">
                            {['Chablis', 'Gluten Free', 'Scallops', 'Vegan Red Wine'].map((term, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-3xl shadow-sm cursor-pointer hover:shadow-md transition-all hover:bg-gray-50 border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Search className="w-5 h-5" />
                                        </div>
                                        <span className="text-dark font-bold">{term}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300" />
                                </div>
                            ))}
                        </div>
                     </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}