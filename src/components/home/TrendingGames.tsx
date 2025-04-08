
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Fire, Star, Trophy } from 'lucide-react';

const TRENDING_GAMES = [
  {
    id: 1,
    title: 'Cosmic Warfare',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&h=400&q=80',
    players: 14523,
    trending: true,
    category: 'FPS',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Dragon Quest Legends',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&h=400&q=80',
    players: 10891,
    trending: true,
    category: 'RPG',
    rating: 4.6
  },
  {
    id: 3,
    title: 'Velocity Racer',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&h=400&q=80',
    players: 9076,
    trending: false,
    category: 'Racing',
    rating: 4.3
  },
  {
    id: 4,
    title: 'Tactical Ops',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&h=400&q=80',
    players: 12345,
    trending: true,
    category: 'Strategy',
    rating: 4.5
  }
];

const TrendingGames = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Create a spotlight effect that cycles through the games
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % TRENDING_GAMES.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-game-primary/10 to-transparent opacity-30"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">
                  Trending Games
                </span>
              </h2>
              <Fire className="h-6 w-6 text-orange-500 animate-pulse" />
            </div>
            <p className="text-muted-foreground">The most popular games people are submitting scores for</p>
          </div>
          <Link to="/leaderboard" className="group">
            <span className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
              View All <TrendingUp className="h-4 w-4" />
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_GAMES.map((game, index) => (
            <Link key={game.id} to={`/leaderboard?game=${game.title}`}>
              <div 
                className={`game-card h-full animate-fade-in relative transform transition-all duration-500 hover:z-10 ${index === activeIndex ? 'scale-105 shadow-xl shadow-game-primary/20 border-game-primary/40' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[3/2] w-full rounded-lg overflow-hidden mb-4 bg-muted relative group">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {game.trending && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-game-accent text-white flex items-center gap-1 animate-pulse">
                        <TrendingUp className="h-3 w-3" /> Trending
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {game.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-white flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span className="font-bold">Join Now</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {game.players.toLocaleString()} players
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{game.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;
