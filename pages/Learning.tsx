import React, { useState } from 'react';
import { learningTracks } from '../data';
import { LearningModule } from '../types';
import { PageContainer, Header } from '../components/Layout';
import { Card, Badge, ProgressBar, Button, ImageWithFallback } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, FileText, BrainCircuit, ChevronRight, Lock, Lightbulb } from 'lucide-react';

const Learning: React.FC = () => {
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);

  return (
    <>
      <Header title="Academy" rightAction={<div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">Level 3 CH</div>} />
      
      <PageContainer className="pb-32">
        {/* User Stats */}
        <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-dark mb-1 tracking-tight">Good Afternoon, Jade</h1>
            <p className="text-subtle font-medium mb-4">You've completed 3 modules this week. Keep it up!</p>
            
            <div className="flex gap-4">
                <div className="flex-1 bg-white p-5 rounded-[2rem] border border-transparent shadow-sm">
                    <div className="text-3xl font-black text-dark mb-1">1,250</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total XP</div>
                </div>
                <div className="flex-1 bg-white p-5 rounded-[2rem] border border-transparent shadow-sm">
                    <div className="text-3xl font-black text-dark mb-1">85%</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg. Score</div>
                </div>
            </div>
        </div>

        {/* Daily Insight */}
        <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Daily Insight</h3>
            <div className="bg-[#1A1A40] text-white rounded-[2rem] p-6 shadow-lg relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lightbulb className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs uppercase tracking-wide">
                        <Lightbulb className="w-4 h-4" />
                        <span>Tip of the Day</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">Decanting Old Vintages</h4>
                    <p className="text-gray-200 text-sm leading-relaxed mb-4 font-medium">
                        For wines older than 10 years, decant just before serving to remove sediment. Don't let them breathe too long or they may lose delicate aromatics.
                    </p>
                    <button className="text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full border border-white/10">
                        Read 30s Guide
                    </button>
                </div>
            </div>
        </div>

        {/* Learning Tracks */}
        <div className="space-y-12">
            {learningTracks.map((track) => (
                <div key={track.id}>
                    <div className="flex justify-between items-end mb-4 px-1">
                        <div>
                             <h2 className="text-2xl font-bold text-dark tracking-tight">{track.title}</h2>
                             <p className="text-sm text-gray-500 font-medium mt-1">{track.modules.length} Modules • {track.description}</p>
                        </div>
                    </div>

                    <div className="relative h-52 rounded-[2.5rem] overflow-hidden mb-6 shadow-sm group bg-gray-100">
                         <ImageWithFallback src={track.image} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                             <div className="flex items-center gap-3 text-white mb-3">
                                 <span className="text-3xl font-black">{track.progress}%</span>
                                 <span className="text-xs font-bold opacity-80 uppercase tracking-wider">Complete</span>
                             </div>
                             <ProgressBar progress={track.progress} className="!bg-white/20 !h-1.5" />
                         </div>
                    </div>

                    <div className="space-y-4 pl-4 border-l-2 border-dashed border-gray-200 ml-5">
                        {track.modules.map((mod, i) => (
                            <div key={mod.id} className="relative pl-8">
                                {/* Connector Dot */}
                                <div className={`absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10 ${mod.isLocked ? 'bg-gray-200' : 'bg-primary'}`}>
                                    {mod.isLocked ? <Lock className="w-2 h-2 text-gray-500" /> : <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>

                                <Card 
                                    onClick={() => !mod.isLocked && setActiveModule(mod)}
                                    className={`!p-5 flex items-center justify-between group border border-transparent hover:border-gray-200 ${mod.isLocked ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                            mod.type === 'video' ? 'bg-red-50 text-red-500' :
                                            mod.type === 'quiz' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                                        }`}>
                                            {mod.type === 'video' && <Play className="w-5 h-5 fill-current" />}
                                            {mod.type === 'article' && <FileText className="w-5 h-5" />}
                                            {mod.type === 'quiz' && <BrainCircuit className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-dark text-base">{mod.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-subtle mt-1 font-medium">
                                                <span className="uppercase tracking-wide">{mod.type}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span>{mod.duration}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-primary font-bold">{mod.xp} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    {!mod.isLocked && <ChevronRight className="w-5 h-5 text-gray-300" />}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* --- FULL SCREEN PLAYER MODAL --- */}
        <AnimatePresence>
            {activeModule && (
                <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[90] bg-white flex flex-col"
                >
                    {/* Player Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-10 pt-safe">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setActiveModule(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <X className="w-5 h-5 text-dark" />
                            </button>
                            <div>
                                <h3 className="font-bold text-dark text-sm leading-tight max-w-[200px] truncate">{activeModule.title}</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{activeModule.type}</p>
                            </div>
                        </div>
                        <Badge type="primary">{activeModule.xp} XP</Badge>
                    </div>

                    {/* Player Content */}
                    <div className="flex-1 overflow-y-auto bg-white">
                        <div className="max-w-xl mx-auto p-6 pb-40">
                            
                            {/* VIDEO CONTENT */}
                            {activeModule.type === 'video' && activeModule.videoUrl && (
                                <div className="mt-4">
                                    <div className="w-full aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl relative group cursor-pointer mb-8">
                                        <ImageWithFallback src={activeModule.videoUrl} className="w-full h-full object-cover opacity-80" alt="Video Thumbnail" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-black text-dark mb-4 leading-tight tracking-tight">{activeModule.title}</h2>
                                    <p className="text-lg text-dark/80 leading-relaxed font-medium">
                                        {activeModule.description || "Watch this video to master the topic."}
                                    </p>
                                </div>
                            )}

                            {/* ARTICLE CONTENT */}
                            {activeModule.type === 'article' && activeModule.content && (
                                <div className="pt-4">
                                    <h2 className="text-3xl font-black text-dark mb-8 leading-tight tracking-tight">{activeModule.title}</h2>
                                    <div className="space-y-8">
                                        {activeModule.content.map((block, i) => (
                                            <div key={i} className={`text-lg text-dark/90 leading-relaxed font-medium ${block.length < 50 ? 'font-bold text-xl text-dark mt-8 mb-2' : ''}`}>
                                                {block}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* QUIZ CONTENT */}
                            {activeModule.type === 'quiz' && activeModule.quizData && (
                                <div className="h-full flex flex-col justify-center py-10">
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center">
                                        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                            <BrainCircuit className="w-10 h-10" />
                                        </div>
                                        <h2 className="text-2xl font-bold mb-10 leading-tight">{activeModule.quizData.question}</h2>
                                        
                                        <div className="space-y-4">
                                            {activeModule.quizData.options.map((option, idx) => (
                                                <button 
                                                    key={idx}
                                                    className="w-full p-5 rounded-2xl border-2 border-gray-100 font-bold text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-[0.98] text-lg"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions - Fixed to Bottom with Safe Area */}
                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 pb-safe z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                        <Button fullWidth onClick={() => setActiveModule(null)}>
                            Complete Module
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </PageContainer>
    </>
  );
};

export default Learning;