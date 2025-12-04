import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dishes, wines } from '../data';
import { PageContainer, Header } from '../components/Layout';
import { Card, Badge, SectionTitle, ImageWithFallback } from '../components/UI';
import { motion } from 'framer-motion';
import { Wine as WineIcon, Info, ChevronRight } from 'lucide-react';

const FoodDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = dishes.find(d => d.id === id);

  if (!dish) return <div>Dish not found</div>;

  const pairingWines = dish.pairingIds.map((wId) => {
    return wines.find(w => w.id === wId);
  }).filter(Boolean);

  return (
    <>
      <Header title="" showBack />
      
      {/* Full width hero image area */}
      <div className="w-full h-80 relative bg-gray-200">
         <ImageWithFallback src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
         <div className="absolute bottom-0 left-0 right-0 p-6 max-w-lg mx-auto w-full">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <div className="flex items-end justify-between mb-2">
                    <h1 className="text-3xl font-bold text-white leading-tight max-w-[80%]">{dish.name}</h1>
                    <span className="text-xl font-semibold text-white">€{dish.price}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                {dish.tags.map(tag => (
                    <span key={tag.id} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wide border border-white/10">
                        {tag.label}
                    </span>
                ))}
                </div>
            </motion.div>
         </div>
      </div>

      <PageContainer className="!pt-6 !px-4"> 
        <div className="mb-8">
            <p className="text-dark/80 text-base leading-relaxed mb-4 font-medium">
              {dish.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-subtle font-medium bg-gray-100 py-2 px-3 rounded-xl inline-flex">
              <Info className="w-3.5 h-3.5" />
              <span>Contains: {dish.allergens.join(', ')}</span>
            </div>
        </div>

        {/* Pairings Section */}
        <div className="mt-8 mb-4">
          <SectionTitle title="Smart Pairings" subtitle="Curated wine suggestions" />
          
          <div className="space-y-4">
            {pairingWines.map((wine: any) => (
              <PairingCard key={wine.id} wine={wine} onClick={() => navigate(`/wine/${wine.id}`)} />
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  );
};

const PairingCard: React.FC<{ wine: any; onClick: () => void }> = ({ wine, onClick }) => {
  return (
    <Card onClick={onClick} className="!p-5 group border border-transparent hover:border-gray-200">
        <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-black/5 ${
                wine.color === 'Red' ? 'bg-[#9B111E]/10 text-[#9B111E]' : 
                wine.color === 'White' ? 'bg-[#E3C565]/10 text-[#E3C565]' : 
                wine.color === 'Sparkling' ? 'bg-[#D8BC6B]/10 text-[#D8BC6B]' :
                'bg-[#F4C4BE]/10 text-[#F4C4BE]'
            }`}>
                <WineIcon className="w-6 h-6 fill-current opacity-80" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="font-bold text-dark text-lg leading-tight">{wine.name}</h3>
                   <span className="text-sm font-bold text-dark bg-gray-100 px-2 py-0.5 rounded-lg">€{wine.priceBottle}</span>
                </div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{wine.region} • {wine.vintage}</p>
                <p className="text-sm text-dark/70 italic leading-snug">"{wine.pairingPitch}"</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 self-center" />
        </div>
    </Card>
  );
};

export default FoodDetail;