
import React from 'react';
import Layout from '@/components/layout/Layout';
import GameStatCard from '@/components/stats/GameStatCard';
import PopularGamesChart from '@/components/stats/PopularGamesChart';
import HighScoresChart from '@/components/stats/HighScoresChart';
import { 
  Users, 
  Trophy, 
  LineChart, 
  Gamepad2 
} from 'lucide-react';

const POPULAR_GAMES_DATA = [
  { name: 'Cosmic', value: 14523 },
  { name: 'Dragon', value: 10891 },
  { name: 'Velocity', value: 9076 },
  { name: 'Tactical', value: 12345 },
  { name: 'Zombie', value: 7250 },
  { name: 'Medieval', value: 6320 },
];

const HIGH_SCORES_DATA = [
  { name: 'Jan', Cosmic: 65000, Dragon: 42000, Tactical: 38000 },
  { name: 'Feb', Cosmic: 68000, Dragon: 44000, Tactical: 42000 },
  { name: 'Mar', Cosmic: 75000, Dragon: 48000, Tactical: 45000 },
  { name: 'Apr', Cosmic: 84000, Dragon: 56000, Tactical: 52000 },
  { name: 'May', Cosmic: 87000, Dragon: 62000, Tactical: 54000 },
  { name: 'Jun', Cosmic: 93000, Dragon: 68000, Tactical: 58000 },
];

const GameStats = () => {
  return (
    <Layout>
      <div className="container px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Game Statistics</h1>
        <p className="text-muted-foreground mb-8">
          Analytics and insights on games, players and scores
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GameStatCard
            title="Total Players"
            value="12,584"
            icon={<Users className="h-4 w-4 text-game-primary" />}
            progress={24}
          />
          <GameStatCard
            title="Records Set"
            value="3,672"
            icon={<Trophy className="h-4 w-4 text-game-secondary" />}
            progress={18}
            color="from-game-secondary to-game-accent"
          />
          <GameStatCard
            title="Active Games"
            value="16"
            icon={<Gamepad2 className="h-4 w-4 text-game-accent" />}
            progress={12}
            color="from-game-accent to-game-primary"
          />
          <GameStatCard
            title="Avg. Daily Scores"
            value="452"
            icon={<LineChart className="h-4 w-4 text-primary" />}
            progress={32}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PopularGamesChart data={POPULAR_GAMES_DATA} />
          <HighScoresChart data={HIGH_SCORES_DATA} />
        </div>
      </div>
    </Layout>
  );
};

export default GameStats;
