
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp } from 'lucide-react';

const TRENDING_GAMES = [
  {
    id: 1,
    title: 'Cosmic Warfare',
    imageUrl: 'https://source.unsplash.com/300x200/?space,game',
    players: 14523,
    trending: true,
    category: 'FPS'
  },
  {
    id: 2,
    title: 'Dragon Quest Legends',
    imageUrl: 'https://source.unsplash.com/300x200/?dragon,fantasy',
    players: 10891,
    trending: true,
    category: 'RPG'
  },
  {
    id: 3,
    title: 'Velocity Racer',
    imageUrl: 'https://source.unsplash.com/300x200/?racing,car',
    players: 9076,
    trending: false,
    category: 'Racing'
  },
  {
    id: 4,
    title: 'Tactical Ops',
    imageUrl: 'https://source.unsplash.com/300x200/?tactical,military',
    players: 12345,
    trending: true,
    category: 'Strategy'
  }
];

const TrendingGames = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Games</h2>
            <p className="text-muted-foreground">The most popular games people are submitting scores for</p>
          </div>
          <Link to="/leaderboard">
            <span className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
              View All <TrendingUp className="h-4 w-4" />
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_GAMES.map((game, index) => (
            <Link key={game.id} to={`/leaderboard?game=${game.title}`}>
              <div 
                className="game-card h-full animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/2] w-full rounded-lg overflow-hidden mb-4 bg-muted relative">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {game.trending && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-game-accent text-white flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Trending
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {game.category}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {game.players.toLocaleString()} players
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
