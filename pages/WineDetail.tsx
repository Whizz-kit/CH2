
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { wines, dishes } from '../data';
import { PageContainer, Header } from '../components/Layout';
import { Card, Badge, SectionTitle, ImageWithFallback } from '../components/UI';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Factory, Wine as WineIcon } from 'lucide-react';

const WineDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const wine = wines.find(w => w.id === id);

  if (!wine) return <div>Wine not found</div>;

  // Reverse Lookup Logic
  const matchingDishes = dishes.filter(d => d.pairingIds.includes(wine.id));

  return (
    <>
      <Header title="" showBack />
      <PageContainer className="pt-28"> 
        
        <div className="flex flex-col items-center mt-4 mb-8 text-center px-4">
            {wine.image && (
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-soft mb-6 bg-white"
                >
                    <ImageWithFallback src={wine.image} className="w-full h-full object-cover" alt="Wine bottle" />
                </motion.div>
            )}
            <h1 className="text-3xl font-extrabold text-dark mb-2 tracking-tight leading-tight">{wine.name}</h1>
            <p className="text-lg text-subtle font-medium mb-2">{wine.producer}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">{wine.region} • {wine.grapes.join(', ')}</p>
            
            <div className="flex gap-2">
                <Badge type="outline">{wine.style}</Badge>
                <Badge type="outline">{wine.vintage}</Badge>
            </div>
        </div>

        {/* Description */}
        <div className="mb-12 px-2">
            <p className="text-dark/80 text-lg leading-relaxed font-medium text-center">
                "{wine.description}"
            </p>
        </div>

        {/* Tasting Profile */}
        <div className="mb-12">
            <h3 className="text-xs font-bold uppercase text-gray-400 mb-6 tracking-wider pl-2">Taste Profile</h3>
            <Card className="!p-8">
                <div className="space-y-6">
                    <ProfileBar label="Body" value={wine.style === 'Bold' ? 85 : 40} />
                    <ProfileBar label="Acidity" value={wine.color === 'White' || wine.color === 'Sparkling' ? 85 : 50} />
                    <ProfileBar label="Sweetness" value={wine.style === 'Sweet' ? 70 : 10} />
                </div>
            </Card>
        </div>

        {/* Winery / Producer Section */}
        <div className="mb-12">
             <SectionTitle title="The Producer" />
             <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
                {/* Optional Winery Image */}
                {wine.producerImage && (
                    <div className="h-40 w-full relative">
                        <ImageWithFallback src={wine.producerImage} className="w-full h-full object-cover" alt={wine.producer} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-6 text-white">
                             <h4 className="font-bold text-xl leading-tight">{wine.producer}</h4>
                             <div className="text-xs opacity-90 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {wine.country}
                             </div>
                        </div>
                    </div>
                )}
                
                <div className="p-6">
                    {!wine.producerImage && (
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-dark border border-gray-100">
                                <Factory className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark text-lg">{wine.producer}</h4>
                                <div className="text-xs text-subtle flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {wine.country}
                                </div>
                            </div>
                        </div>
                    )}

                    <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                        {wine.producerDescription || `A renowned producer from ${wine.region}, known for their dedication to quality and traditional winemaking techniques.`}
                    </p>

                    <button 
                        onClick={() => navigate('/wine', { state: { producer: wine.producer } })}
                        className="w-full py-3 rounded-xl bg-gray-50 text-dark font-bold text-sm border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <WineIcon className="w-4 h-4" />
                        View all wines from {wine.producer}
                    </button>
                </div>
             </div>
        </div>

        {/* Reverse Lookup Section - Clickable */}
        <div className="bg-white -mx-6 px-6 py-10 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] border-t border-gray-50">
            <SectionTitle title="Menu Matches" subtitle="Best food pairings for this wine" />
            
            <div className="space-y-4">
                {matchingDishes.length > 0 ? matchingDishes.map(dish => (
                    <Card key={dish.id} onClick={() => navigate(`/food/${dish.id}`)} className="!p-4 bg-secondary border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm">
                        <div className="flex items-start gap-4">
                             {dish.image && (
                               <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-200">
                                 <ImageWithFallback src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
                                </div>
                             )}
                             <div className="flex-1 min-w-0">
                                 <h4 className="font-bold text-dark text-lg truncate">{dish.name}</h4>
                                 <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed font-medium">{dish.description}</p>
                             </div>
                             <ChevronRight className="w-5 h-5 text-gray-300 self-center" />
                        </div>
                    </Card>
                )) : (
                    <div className="p-8 text-center text-gray-400 bg-secondary rounded-[2rem] border border-dashed border-gray-200">
                        <p>No direct menu matches tailored, but great with generic {wine.color === 'Red' ? 'red meats' : 'seafood'}.</p>
                    </div>
                )}
            </div>
        </div>

      </PageContainer>
    </>
  );
};

const ProfileBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="flex items-center gap-4">
        <span className="w-24 text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-dark rounded-full opacity-80" 
            />
        </div>
    </div>
);

export default WineDetail;
