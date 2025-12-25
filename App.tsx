
import React, { useState, useEffect, useCallback } from 'react';
import { Car, SearchState } from './types';
import { fetchCarDetails, fetchFeaturedCars } from './services/geminiService';
import { CarCard } from './components/CarCard';
import { CarModal } from './components/CarModal';

const App: React.FC = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    loading: false,
    error: null
  });
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const loadFeatured = async () => {
      setSearchState(prev => ({ ...prev, loading: true }));
      try {
        const cars = await fetchFeaturedCars();
        setFeaturedCars(cars);
      } catch (err) {
        console.error("Failed to load featured cars", err);
      } finally {
        setSearchState(prev => ({ ...prev, loading: false }));
      }
    };
    loadFeatured();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchState.query.trim()) return;

    setSearchState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const car = await fetchCarDetails(searchState.query);
      setSearchResults([car]);
    } catch (err) {
      setSearchState(prev => ({ ...prev, error: "Failed to find car details. Try a different model." }));
    } finally {
      setSearchState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header & Hero */}
      <header className="bg-slate-900 pt-16 pb-32 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[100%] h-[200%] bg-emerald-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Auto<span className="text-indigo-400">Sphere</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10">
            The world's most comprehensive car database. Real-time market values, license requirements, and DIY repair knowledge at your fingertips.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto group">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search any car (e.g. 2024 Tesla Model 3, 1998 Toyota Supra)..."
                value={searchState.query}
                onChange={(e) => setSearchState(prev => ({ ...prev, query: e.target.value }))}
                className="w-full pl-6 pr-32 py-5 bg-white rounded-2xl text-slate-900 shadow-2xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all text-lg font-medium"
              />
              <button 
                type="submit"
                disabled={searchState.loading}
                className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white rounded-xl font-bold transition-colors flex items-center gap-2"
              >
                {searchState.loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>
          {searchState.error && (
            <p className="mt-4 text-rose-400 font-medium text-sm">{searchState.error}</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Search Results</h2>
              <button 
                onClick={() => setSearchResults([])}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
              >
                Clear Results
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map(car => (
                <CarCard key={car.id} car={car} onClick={setSelectedCar} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1.5 bg-indigo-600 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-900">Featured Vehicles</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} onClick={setSelectedCar} />
            ))}
            
            {/* Loading skeletons */}
            {searchState.loading && featuredCars.length === 0 && Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white h-72 rounded-2xl animate-pulse border border-slate-100 p-6 flex flex-col justify-between">
                <div>
                   <div className="h-32 bg-slate-100 rounded-xl mb-4" />
                   <div className="h-4 w-2/3 bg-slate-100 rounded mb-2" />
                   <div className="h-4 w-1/3 bg-slate-100 rounded" />
                </div>
                <div className="h-8 w-full bg-slate-100 rounded-lg" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Details Modal */}
      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      {/* Floating Info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 text-sm font-medium border border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>AI-Powered Insights</span>
          </div>
          <div className="h-4 w-[1px] bg-white/20" />
          <span>Updates Daily</span>
        </div>
      </div>
    </div>
  );
};

export default App;
