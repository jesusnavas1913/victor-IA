import React, { useState, useMemo } from 'react';
import { AI_TOOLS } from './constants';
import { Category, CostType } from './types';
import AudioPlayer from './components/AudioPlayer';
import GeminiAssistant from './components/GeminiAssistant';
import { Search, Cpu, Zap, Lock, DollarSign } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = Object.values(Category);

  return (
    <div className="min-h-screen bg-cyber-black bg-grid font-sans selection:bg-cyber-pink selection:text-white pb-32">
      
      {/* Header */}
      <header className="relative border-b-2 border-cyber-cyan/30 bg-cyber-black/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 to-cyber-pink/10 opacity-50 pointer-events-none"></div>
        <div className="container mx-auto px-4 py-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2 animate-pulse-fast font-mono">
            <span className="text-cyber-cyan">[</span> NEXUS <span className="text-cyber-pink">AI</span> <span className="text-cyber-cyan">]</span>
          </h1>
          <p className="text-cyber-cyan/80 font-mono text-sm md:text-base tracking-[0.2em] uppercase">
            // Verified Intelligence Database // 2025
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        
        {/* Controls */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:w-1/3 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-500 group-focus-within:text-cyber-cyan transition-colors" size={20} />
            </div>
            <input
              type="text"
              placeholder="Scan database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-cyber-card border border-gray-700 text-white rounded-lg focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all font-mono"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded text-sm font-bold border transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-cyber-cyan hover:text-cyber-cyan'
              }`}
            >
              ALL_SYSTEMS
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded text-xs md:text-sm font-semibold border transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-cyber-pink text-white border-cyber-pink shadow-[0_0_10px_rgba(255,0,60,0.6)]'
                    : 'bg-transparent text-gray-400 border-gray-800 hover:border-cyber-pink hover:text-cyber-pink'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id} 
              className="group relative bg-cyber-card border border-gray-800 rounded-xl p-6 hover:-translate-y-2 hover:border-cyber-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 overflow-hidden"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-800 to-transparent opacity-20 group-hover:from-cyber-cyan group-hover:opacity-20 transition-all duration-500"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-4xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] group-hover:animate-float">
                  {tool.icon}
                </span>
                <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded border ${
                  tool.cost === CostType.FREE ? 'text-cyber-green border-cyber-green/30 bg-cyber-green/10' :
                  tool.cost === CostType.PAID ? 'text-cyber-pink border-cyber-pink/30 bg-cyber-pink/10' :
                  'text-cyber-yellow border-cyber-yellow/30 bg-cyber-yellow/10'
                }`}>
                  {tool.cost}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyber-cyan transition-colors">
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-cyber-pink underline-offset-4">
                  {tool.name}
                </a>
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {tool.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-600 font-mono mt-auto pt-4 border-t border-gray-800">
                <span className="flex items-center gap-1">
                  <Cpu size={12} /> {tool.category}
                </span>
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyber-cyan hover:text-white transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300"
                >
                  ACCESS <Zap size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-cyber-card border border-gray-800 mb-4">
              <Lock size={48} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-500 font-mono">NO DATA FOUND</h2>
            <p className="text-gray-600">Adjust scan parameters.</p>
          </div>
        )}

      </main>

      <footer className="text-center py-8 border-t border-gray-800 mt-12 bg-cyber-black">
        <p className="text-gray-500 font-mono text-xs">
          [ SYSTEM STATUS: STABLE ] <span className="text-cyber-cyan mx-2">///</span> DESIGNED BY NEXUS CORE
        </p>
      </footer>

      {/* Floating Widgets */}
      <AudioPlayer />
      <GeminiAssistant />

    </div>
  );
};

export default App;
