import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Trophy, Sparkles, Zap, Star, Crown, ArrowUpRight, Medal, Gamepad2 } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const [animateCount, setAnimateCount] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const targetCount = 8542;

  useEffect(() => {
    // Trigger count animation after a delay
    const timer = setTimeout(() => {
      setAnimateCount(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animateCount) {
      const interval = setInterval(() => {
        setPlayerCount(prev => {
          const increment = Math.floor((targetCount - prev) / 10) + 1;
          const nextValue = prev + increment;
          
          if (nextValue >= targetCount) {
            clearInterval(interval);
            return targetCount;
          }
          return nextValue;
        });
      }, 40);
      
      return () => clearInterval(interval);
    }
  }, [animateCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const topPlayers = [
    { 
      name: "NinjaWarrior", 
      score: 98540, 
      game: "Cosmic Warfare", 
      rank: 1, 
      icon: <Trophy className="h-5 w-5 text-yellow-400" />,
      gamesPlayed: 312,
      winRate: "87%",
      color: "from-yellow-400 to-amber-500",
      badgeColor: "bg-yellow-400/20 text-yellow-400"
    },
    { 
      name: "EpicGamer42", 
      score: 87220, 
      game: "Cosmic Warfare", 
      rank: 2,
      icon: <Medal className="h-5 w-5 text-gray-300" />,
      gamesPlayed: 278,
      winRate: "82%",
      color: "from-gray-300 to-gray-400",
      badgeColor: "bg-gray-400/20 text-gray-300"
    },
    { 
      name: "ProSniper", 
      score: 76890, 
      game: "Dragon Quest Legends", 
      rank: 3,
      icon: <Medal className="h-5 w-5 text-amber-700" />,
      gamesPlayed: 245,
      winRate: "79%",
      color: "from-amber-700 to-amber-600",
      badgeColor: "bg-amber-700/20 text-amber-700"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-background pb-24 pt-24">
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      <div className="absolute -top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-game-primary/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-game-accent/20 to-transparent blur-3xl" />
      
      <div className="absolute top-20 right-[20%] w-4 h-4 rounded-full bg-game-primary/50 animate-pulse" style={{animationDelay: '0.2s'}} />
      <div className="absolute top-52 left-[15%] w-3 h-3 rounded-full bg-game-secondary/60 animate-pulse" style={{animationDelay: '0.8s'}} />
      <div className="absolute bottom-40 right-[30%] w-5 h-5 rounded-full bg-game-accent/40 animate-pulse" style={{animationDelay: '1.4s'}} />
      <div className="absolute bottom-60 left-[25%] w-2 h-2 rounded-full bg-orange-400/50 animate-pulse" style={{animationDelay: '0.5s'}} />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-5 animate-fade-in">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium animate-scale-in">
              <span className="text-game-accent font-bold">{playerCount.toLocaleString()}</span> gamers have joined today
            </span>
          </div>
          
          <h1 className="max-w-4xl mb-8 animate-slide-in">
            <div className="relative inline-block">
              <span className="bg-gradient-to-r from-game-primary via-game-accent to-game-secondary bg-clip-text text-transparent text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-sm">
                Track, Compare & Dominate
              </span>
              <div className="absolute -right-12 -top-10 rotate-12">
                <Zap className="h-10 w-10 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl">The Ultimate Gaming Leaderboard</span>
          </h1>
          
          <p className="max-w-2xl text-xl text-foreground/80 mb-12 animate-slide-in" style={{ animationDelay: '100ms' }}>
            Join thousands of gamers showcasing their skills. Submit your high scores, 
            track your progress, and <span className="text-game-accent font-semibold">rise to the top</span> of the leaderboard.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-slide-in mb-16" style={{ animationDelay: '200ms' }}>
            <Link to="/leaderboard">
              <Button className="btn-game gap-2 text-base px-6 py-6 shadow-lg shadow-game-primary/20 hover:scale-105 transition-transform">
                <Trophy className="h-5 w-5" />
                View Leaderboards
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="gap-2 text-base px-6 py-6 border-white/20 hover:border-white/40 hover:bg-white/5 hover:scale-105 transition-transform">
                Create Account
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center animate-scale-in w-full" style={{ animationDelay: '300ms' }}>
            <div className="relative w-full max-w-5xl aspect-video rounded-xl border border-white/10 overflow-hidden shadow-xl bg-gradient-to-br from-game-muted/30 to-game-background/70">
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full bg-white/5"
                    style={{
                      width: `${Math.random() * 10 + 2}px`,
                      height: `${Math.random() * 10 + 2}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 10 + 5}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <div className="glass-panel w-full max-w-md py-8 px-6 backdrop-blur-lg hover:shadow-lg hover:shadow-game-primary/10 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-white">Top Players</h3>
                      <div className="absolute -right-9 -top-2">
                        <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 mb-6 flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Updated in real-time
                  </p>
                  
                  <div className="space-y-3">
                    {topPlayers.map((player, index) => (
                      <HoverCard key={player.name}>
                        <HoverCardTrigger asChild>
                          <div 
                            className={`flex justify-between p-4 rounded-lg transition-all duration-500 cursor-pointer relative overflow-hidden ${activeCard === index ? 'scale-105' : 'scale-100'}`}
                            style={{
                              background: activeCard === index ? 
                                `linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.2))` : 
                                'rgba(255, 255, 255, 0.05)'
                            }}
                          >
                            {activeCard === index && (
                              <div className="absolute inset-0 bg-gradient-to-r from-game-primary/10 via-game-accent/10 to-game-secondary/10 animate-pulse"></div>
                            )}
                            
                            <div className="flex items-center gap-3 z-10">
                              <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-${player.badgeColor}`}>
                                {player.icon}
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-game-secondary flex items-center">
                                  {player.name}
                                  {index === 0 && <Crown className="h-4 w-4 text-yellow-400 ml-1" />}
                                </div>
                                <div className="text-xs text-white/60">{player.game}</div>
                              </div>
                            </div>
                            
                            <div className={`font-mono text-lg font-bold ${activeCard === index ? 'text-white scale-110 transition-all duration-300' : 'text-white/80'}`}>
                              {player.score.toLocaleString()}
                            </div>
                            
                            {activeCard === index && (
                              <>
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-game-accent to-transparent"></div>
                                <div className="absolute -right-1 bottom-1 rounded-full bg-game-accent/30 w-2 h-2 animate-pulse"></div>
                              </>
                            )}
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-card/95 backdrop-blur border-white/10">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-semibold">{player.name}</h4>
                              <p className="text-sm text-muted-foreground">Top player in {player.game}</p>
                            </div>
                            <div className={`p-2 rounded-full ${player.badgeColor}`}>
                              {player.icon}
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-3">
                              <Card className="bg-white/5 border-white/10">
                                <CardContent className="p-3 text-center">
                                  <p className="text-xs text-white/60">Games Played</p>
                                  <p className="text-lg font-medium">{player.gamesPlayed}</p>
                                </CardContent>
                              </Card>
                              <Card className="bg-white/5 border-white/10">
                                <CardContent className="p-3 text-center">
                                  <p className="text-xs text-white/60">Win Rate</p>
                                  <p className="text-lg font-medium">{player.winRate}</p>
                                </CardContent>
                              </Card>
                            </div>
                            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-game-accent gap-1 group">
                              View full profile
                              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                    
                    <Link to="/leaderboard" className="block mt-6">
                      <Button variant="ghost" size="sm" className="w-full text-white/70 hover:text-white gap-1 group border border-white/10 bg-white/5 hover:bg-white/10">
                        <Gamepad2 className="h-4 w-4" />
                        View Complete Leaderboard
                        <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
