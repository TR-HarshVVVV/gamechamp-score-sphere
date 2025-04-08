
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Trophy, Sparkles, Zap, Star } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const HeroSection = () => {
  const [animateCount, setAnimateCount] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);
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

  return (
    <div className="relative overflow-hidden bg-background pb-24 pt-24">
      {/* Abstract backgrounds and patterns */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      <div className="absolute -top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-game-primary/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-game-accent/20 to-transparent blur-3xl" />
      
      {/* Animated particles */}
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
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <div className="glass-panel w-full max-w-md py-8 px-6 backdrop-blur-lg hover:shadow-lg hover:shadow-game-primary/10 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-white">Top Players</h3>
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-sm text-white/70 mb-6">Updated in real-time</p>
                  
                  <div className="space-y-3">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="flex justify-between p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                          <span className="font-medium text-game-secondary flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-400" /> NinjaWarrior
                          </span>
                          <span className="font-mono">98,540</span>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-card/95 backdrop-blur border-white/10">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">NinjaWarrior</h4>
                            <p className="text-sm text-muted-foreground">Top player in Cosmic Warfare</p>
                          </div>
                          <div className="bg-game-primary/20 p-2 rounded-full">
                            <Trophy className="h-6 w-6 text-yellow-400" />
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Games Played: <span className="font-medium">312</span></div>
                            <div>Win Rate: <span className="font-medium">87%</span></div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    
                    <div className="flex justify-between p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                      <span className="font-medium text-game-secondary">2. EpicGamer42</span>
                      <span className="font-mono">87,220</span>
                    </div>
                    
                    <div className="flex justify-between p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                      <span className="font-medium text-game-secondary">3. ProSniper</span>
                      <span className="font-mono">76,890</span>
                    </div>
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
