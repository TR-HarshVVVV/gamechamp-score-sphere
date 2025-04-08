
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, BarChart2, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/70 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-game-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-game-primary to-game-secondary bg-clip-text text-transparent">
            GameChamp
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/submit" className="nav-link">Submit Score</Link>
          <Link to="/stats" className="nav-link">Game Stats</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <User className="h-4 w-4" />
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="hidden md:flex">Sign Up</Button>
          </Link>
          
          {/* Mobile Menu Icons */}
          <div className="flex md:hidden gap-4">
            <Link to="/leaderboard">
              <Trophy className="h-5 w-5" />
            </Link>
            <Link to="/stats">
              <BarChart2 className="h-5 w-5" />
            </Link>
            <Link to="/login">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
