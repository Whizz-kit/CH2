
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { wines } from '../data';
import { WineColor } from '../types';
import { PageContainer, Header } from '../components/Layout';
import { Card, Drawer, Button, ImageWithFallback } from '../components/UI';
import { Search, ChevronRight, SlidersHorizontal, Check, MapPin, Factory, Wine, ArrowLeft } from 'lucide-react';

const WineList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeColor, setActiveColor] = useState<WineColor | 'All'>('All');
  const [viewMode, setViewMode] = useState<'wines' | 'producers'>('wines');
  
  // Advanced Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedProducers, setSelectedProducers] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc' | 'default'>('default');
  
  // Producer Full View State
  const [activeProducer, setActiveProducer] = useState<string | null>(null);

  // Handle incoming navigation state (e.g. from WineDetail)
  useEffect(() => {
      if (location.state && location.state.producer) {
          setActiveProducer(location.state.producer);
          setViewMode('producers');
          // Clear state to prevent getting stuck
          window.history.replaceState({}, document.title);
      }
  }, [location]);

  // Extract unique filter options
  const countries = Array.from(new Set(wines.map(w => w.country)));
  const producersList = Array.from(new Set(wines.map(w => w.producer))).sort();

  const toggleCountry = (country: string) => {
      if (selectedCountries.includes(country)) {
          setSelectedCountries(selectedCountries.filter(c => c !== country));
      } else {
          setSelectedCountries([...selectedCountries, country]);
      }
  };

  const toggleProducer = (producer: string) => {
      if (selectedProducers.includes(producer)) {
          setSelectedProducers(selectedProducers.filter(p => p !== producer));
      } else {
          setSelectedProducers([...selectedProducers, producer]);
      }
  };

  const clearFilters = () => {
      setActiveColor('All');
      setSelectedCountries([]);
      setSelectedProducers([]);
      setSearchTerm('');
      setSortOrder('default');
  };

  // Filter Logic
  const filteredWines = wines.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          w.grapes.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesColor = activeColor === 'All' || w.color === activeColor;
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(w.country);
    const matchesProducer = selectedProducers.length === 0 || selectedProducers.includes(w.producer);
    
    return matchesSearch && matchesColor && matchesCountry && matchesProducer;
  }).sort((a, b) => {
      if (sortOrder === 'price-asc') return a.priceBottle - b.priceBottle;
      if (sortOrder === 'price-desc') return b.priceBottle - a.priceBottle;
      return 0;
  });

  const activeFilterCount = selectedCountries.length + selectedProducers.length + (sortOrder !== 'default' ? 1 : 0);

  const getWineIconColor = (color: WineColor) => {
      switch(color) {
          case 'Red': return 'text-[#9B111E] bg-[#9B111E]/10'; // Ruby / Red
          case 'White': return 'text-[#E3C565] bg-[#E3C565]/10'; // Straw / Gold
          case 'Rosé': return 'text-[#F4C4BE] bg-[#F4C4BE]/20'; // Pink
          case 'Sparkling': return 'text-[#D8BC6B] bg-[#D8BC6B]/10'; // Champagne Gold
          default: return 'text-gray-400 bg-gray-50';
      }
  };

  // --- RENDER: PRODUCER FULL VIEW ---
  if (activeProducer) {
      const producerInfo = wines.find(w => w.producer === activeProducer);
      const producerWines = wines.filter(w => w.producer === activeProducer);
      
      return (
        <>
            <Header title="" showBack rightAction={
                <button onClick={() => setActiveProducer(null)} className="text-sm font-bold text-dark bg-gray-100 px-4 py-2 rounded-full">
                    Close
                </button>
            }/>
            <PageContainer>
                 {producerInfo?.producerImage && (
                    <div className="w-full h-48 rounded-[2rem] overflow-hidden mb-6 shadow-sm">
                        <ImageWithFallback src={producerInfo.producerImage} alt={activeProducer} className="w-full h-full object-cover" />
                    </div>
                 )}
                 
                 <div className="mb-8 mt-2">
                     <div className="flex items-center gap-3 mb-4">
                        {!producerInfo?.producerImage && (
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-dark shadow-sm">
                                <Factory className="w-8 h-8" />
                            </div>
                        )}
                        <div>
                             <h1 className="text-3xl font-extrabold text-dark tracking-tight leading-tight">{activeProducer}</h1>
                             <div className="flex items-center gap-2 text-sm text-subtle font-medium mt-1">
                                <MapPin className="w-4 h-4" />
                                {producerInfo?.country}
                             </div>
                        </div>
                     </div>
                     <p className="text-lg text-dark/80 leading-relaxed font-medium">
                        {producerInfo?.producerDescription || "No description available."}
                     </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-dark">Wines Available</h3>
                    <span className="bg-gray-100 text-dark text-xs font-bold px-2 py-1 rounded-md">{producerWines.length}</span>
                </div>

                <div className="space-y-4">
                    {producerWines.map(wine => (
                        <Card key={wine.id} onClick={() => navigate(`/wine/${wine.id}`)} className="group !p-5 flex items-center justify-between border border-transparent hover:border-black/5 hover:shadow-md">
                            <div className="flex items-center gap-5">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getWineIconColor(wine.color)}`}>
                                    <Wine className="w-6 h-6 fill-current opacity-90" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-lg">{wine.name}</h4>
                                    <div className="flex gap-2 mt-1">
                                         <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs font-bold text-gray-500">{wine.vintage}</span>
                                         <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs font-bold text-gray-500">{wine.color}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-bold text-dark text-lg">€{wine.priceBottle}</span>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                            </div>
                        </Card>
                    ))}
                </div>
            </PageContainer>
        </>
      )
  }

  // --- RENDER: MAIN LIST VIEW ---
  return (
    <>
      <Header title="Wine List" />
      
      <PageContainer>
        {/* Toggle View Mode */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 shadow-inner">
            <button 
                onClick={() => setViewMode('wines')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${viewMode === 'wines' ? 'bg-white text-dark shadow-sm' : 'text-gray-400 hover:text-dark'}`}
            >
                Wines
            </button>
            <button 
                onClick={() => setViewMode('producers')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${viewMode === 'producers' ? 'bg-white text-dark shadow-sm' : 'text-gray-400 hover:text-dark'}`}
            >
                Producers
            </button>
        </div>

        {viewMode === 'wines' ? (
        <>
            {/* Search & Filter Bar */}
            <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text"
                        placeholder="Search wines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white h-12 rounded-2xl pl-10 pr-4 shadow-sm border border-black/[0.04] focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm font-medium transition-all"
                    />
                </div>
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className={`w-12 h-12 rounded-2xl shadow-sm border border-black/[0.04] flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all relative ${activeFilterCount > 0 ? 'bg-primary text-white border-primary' : 'bg-white text-dark'}`}
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    {activeFilterCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center border-2 border-white font-bold">
                            {activeFilterCount}
                        </div>
                    )}
                </button>
            </div>

            {/* Quick Filters (Pills) */}
            <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                {['All', 'Red', 'White', 'Rosé', 'Sparkling'].map((color) => (
                    <button 
                        key={color}
                        onClick={() => setActiveColor(color as any)}
                        className={`
                            px-4 py-2.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap
                            ${activeColor === color 
                                ? 'bg-dark text-white border-dark shadow-md scale-100' 
                                : 'bg-white text-gray-500 border-transparent hover:bg-gray-100 scale-95'}
                        `}
                    >
                        {color}
                    </button>
                ))}
            </div>

            {/* Wine List Cards - Fresh Design */}
            <div className="space-y-4">
                {filteredWines.length === 0 && (
                    <div className="text-center py-12 opacity-50">
                        <p className="text-sm">No wines found matching your filters.</p>
                        <button onClick={clearFilters} className="mt-2 text-primary font-bold text-sm">Clear all filters</button>
                    </div>
                )}
                
                {filteredWines.map(wine => (
                    <Card key={wine.id} onClick={() => navigate(`/wine/${wine.id}`)} className="group !p-5 flex items-center justify-between hover:shadow-md transition-all border border-transparent hover:border-black/5">
                        <div className="flex items-start gap-5">
                            {/* Wine Icon Circle */}
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${getWineIconColor(wine.color)}`}>
                                <Wine className="w-7 h-7 fill-current opacity-90" strokeWidth={2} />
                            </div>
                            
                            <div className="flex flex-col">
                                <h3 className="font-extrabold text-dark text-lg leading-tight tracking-tight mb-1">{wine.name}</h3>
                                <div className="text-sm text-subtle font-medium mb-3">
                                    {wine.producer} • {wine.country}
                                </div>
                                
                                {/* Pill Tags */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 border border-gray-200/50">
                                        {wine.grapes[0]}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 border border-gray-200/50">
                                        {wine.vintage}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
        ) : (
        <>
            {/* Producers List */}
            <div className="space-y-4">
                {producersList.map(producer => {
                    const producerWines = wines.filter(w => w.producer === producer);
                    const country = producerWines[0]?.country || 'Unknown';
                    const image = producerWines[0]?.producerImage;
                    
                    return (
                        <Card key={producer} onClick={() => setActiveProducer(producer)} className="!p-0 flex flex-col sm:flex-row group hover:shadow-md transition-all overflow-hidden border border-transparent hover:border-black/5">
                             {image ? (
                                <div className="h-32 w-full sm:w-32 bg-gray-200 relative">
                                    <ImageWithFallback src={image} className="w-full h-full object-cover" alt={producer} />
                                </div>
                             ) : (
                                <div className="h-24 w-full sm:w-24 bg-gray-50 flex items-center justify-center text-gray-300">
                                    <Factory className="w-8 h-8" />
                                </div>
                             )}
                             
                             <div className="p-5 flex-1 flex items-center justify-between">
                                <div>
                                    <h3 className="font-extrabold text-dark text-lg tracking-tight">{producer}</h3>
                                    <div className="text-sm text-subtle flex items-center gap-1.5 mt-1 font-medium">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{country}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span>{producerWines.length} Wines</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                             </div>
                        </Card>
                    );
                })}
            </div>
        </>
        )}

        {/* Advanced Filter Drawer (Still used for filters, but NOT producers) */}
        <Drawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filters & Sort">
            <div className="space-y-8 pb-10">
                
                {/* Sort Order */}
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sort By</h4>
                    <div className="grid grid-cols-1 gap-2">
                        {[{l: 'Default', v: 'default'}, {l: 'Price: Low to High', v: 'price-asc'}, {l: 'Price: High to Low', v: 'price-desc'}].map((opt: any) => (
                            <button
                                key={opt.v}
                                onClick={() => setSortOrder(opt.v)}
                                className={`px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-left flex justify-between items-center ${
                                    sortOrder === opt.v ? 'bg-gray-100 text-dark' : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {opt.l}
                                {sortOrder === opt.v && <Check className="w-4 h-4 text-primary" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Country Filter */}
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Region / Country
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {countries.map(country => (
                            <button
                                key={country}
                                onClick={() => toggleCountry(country)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                                    selectedCountries.includes(country) 
                                        ? 'bg-dark text-white border-dark' 
                                        : 'bg-white text-gray-600 border-gray-200'
                                }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-8 flex gap-3 pb-safe">
                     <Button variant="ghost" onClick={clearFilters} className="!w-auto px-6">Reset</Button>
                    <Button fullWidth onClick={() => setIsFilterOpen(false)}>Show {filteredWines.length} Wines</Button>
                </div>
            </div>
        </Drawer>

      </PageContainer>
    </>
  );
};

export default WineList;
