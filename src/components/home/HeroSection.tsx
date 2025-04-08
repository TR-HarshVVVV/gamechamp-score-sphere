
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Trophy } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background pb-16 pt-24">
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-4xl mb-6 animate-slide-in">
            <span className="bg-gradient-to-r from-game-primary via-game-accent to-game-secondary bg-clip-text text-transparent">
              Track, Compare & Dominate
            </span>
            <br />
            The Ultimate Gaming Leaderboard
          </h1>
          
          <p className="max-w-2xl text-xl text-foreground/80 mb-10 animate-slide-in" style={{ animationDelay: '100ms' }}>
            Join thousands of gamers showcasing their skills. Submit your high scores, 
            track your progress, and rise to the top of the leaderboard.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-slide-in" style={{ animationDelay: '200ms' }}>
            <Link to="/leaderboard">
              <Button className="btn-game gap-2">
                <Trophy className="h-4 w-4" />
                View Leaderboards
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="gap-2">
                Create Account
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 flex justify-center animate-scale-in" style={{ animationDelay: '300ms' }}>
            <div className="relative w-full max-w-5xl aspect-video rounded-xl border border-white/10 overflow-hidden shadow-xl bg-gradient-to-br from-game-muted to-game-background">
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <div className="glass-panel w-full max-w-md py-8 px-6 backdrop-blur-lg">
                  <h3 className="text-2xl font-bold mb-2 text-white">Featured Leaderboard</h3>
                  <p className="text-sm text-white/70 mb-6">Updated in real-time</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 rounded bg-white/10">
                      <span className="font-medium text-game-secondary">1. NinjaWarrior</span>
                      <span>98,540</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white/10">
                      <span className="font-medium text-game-secondary">2. EpicGamer42</span>
                      <span>87,220</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white/10">
                      <span className="font-medium text-game-secondary">3. ProSniper</span>
                      <span>76,890</span>
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
