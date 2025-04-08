
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t border-border mt-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">GameChamp Leaderboard</h3>
            <p className="text-muted-foreground mb-4">
              Track high scores, compete with friends, and climb to the top of the gaming world!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/leaderboard" className="text-muted-foreground hover:text-primary">Leaderboard</Link></li>
              <li><Link to="/submit" className="text-muted-foreground hover:text-primary">Submit Score</Link></li>
              <li><Link to="/stats" className="text-muted-foreground hover:text-primary">Game Stats</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-muted-foreground hover:text-primary">Login</Link></li>
              <li><Link to="/signup" className="text-muted-foreground hover:text-primary">Sign Up</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary">My Profile</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GameChamp. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
