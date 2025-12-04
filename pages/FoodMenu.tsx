import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dishes } from '../data';
import { PageContainer, Header } from '../components/Layout';
import { Card, Badge, ImageWithFallback } from '../components/UI';
import { ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Starter', 'Main', 'Dessert', 'Side', 'Special'];

const FoodMenu: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Starter');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDishes = dishes.filter(d => {
    const matchesCategory = d.category === activeCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header title="Food Menu" />
      
      <PageContainer>
        
        {/* Search Bar - Matching WineList Style */}
        <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white h-12 rounded-2xl pl-10 pr-4 shadow-sm border border-black/[0.04] focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm font-medium transition-all"
            />
        </div>

        {/* Categories - Pill Style (Matching WineList) */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                        px-4 py-2.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap
                        ${activeCategory === cat 
                        ? 'bg-dark text-white border-dark shadow-md scale-100' 
                        : 'bg-white text-gray-500 border-transparent hover:bg-gray-100 scale-95'}
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Magazine Layout */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode='popLayout'>
            {filteredDishes.map((dish, i) => (
                <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Card onClick={() => navigate(`/food/${dish.id}`)} className="group !p-0 overflow-hidden border border-transparent hover:border-black/5 hover:shadow-md transition-all">
                        <div className="flex flex-col sm:flex-row h-full">
                            
                            {/* Image Section */}
                            <div className="h-56 sm:h-auto sm:w-2/5 relative overflow-hidden bg-gray-100">
                                <ImageWithFallback 
                                    src={dish.image} 
                                    alt={dish.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm">
                                    €{dish.price}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 sm:w-3/5 flex flex-col justify-between relative bg-white">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-extrabold text-dark leading-tight tracking-tight">
                                            {dish.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-subtle line-clamp-2 mb-4 leading-relaxed font-medium">
                                        {dish.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {dish.tags.slice(0, 3).map(tag => (
                                        <Badge key={tag.id} type={tag.type === 'diet' ? 'diet' : 'flavor'}>
                                            {tag.label}
                                        </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        {dish.allergens.length > 0 ? dish.allergens.join(' • ') : 'No Allergens'}
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDishes.length === 0 && (
            <div className="py-24 text-center opacity-40">
                <p className="text-lg font-bold">No items found.</p>
            </div>
        )}
      </PageContainer>
    </>
  );
};

export default FoodMenu;