
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import LeaderboardTable, { ScoreEntry } from '@/components/leaderboard/LeaderboardTable';
import GameFilter from '@/components/leaderboard/GameFilter';
import { useSearchParams } from 'react-router-dom';

// Sample leaderboard data
const GAMES = [
  "Cosmic Warfare",
  "Dragon Quest Legends",
  "Velocity Racer",
  "Tactical Ops",
  "Zombie Survival",
  "Medieval Kingdom"
];

const SAMPLE_DATA: ScoreEntry[] = [
  { id: '1', rank: 1, player: 'NinjaWarrior', game: 'Cosmic Warfare', score: 98540, date: '2023-04-05' },
  { id: '2', rank: 2, player: 'EpicGamer42', game: 'Cosmic Warfare', score: 87220, date: '2023-04-07' },
  { id: '3', rank: 3, player: 'ProSniper', game: 'Dragon Quest Legends', score: 76890, date: '2023-04-02' },
  { id: '4', rank: 4, player: 'GalaxyQuest', game: 'Velocity Racer', score: 65430, date: '2023-04-01' },
  { id: '5', rank: 5, player: 'MasterChief', game: 'Tactical Ops', score: 59760, date: '2023-04-06' },
  { id: '6', rank: 6, player: 'ShadowHunter', game: 'Dragon Quest Legends', score: 54320, date: '2023-04-03' },
  { id: '7', rank: 7, player: 'DarkKnight', game: 'Cosmic Warfare', score: 51890, date: '2023-04-04' },
  { id: '8', rank: 8, player: 'StarLord', game: 'Velocity Racer', score: 48760, date: '2023-04-08' },
  { id: '9', rank: 9, player: 'IronGiant', game: 'Tactical Ops', score: 45230, date: '2023-04-02' },
  { id: '10', rank: 10, player: 'SilverArrow', game: 'Dragon Quest Legends', score: 42980, date: '2023-04-05' },
  { id: '11', rank: 11, player: 'BlazeFury', game: 'Zombie Survival', score: 41250, date: '2023-04-07' },
  { id: '12', rank: 12, player: 'ThunderBolt', game: 'Medieval Kingdom', score: 39740, date: '2023-04-01' },
];

const Leaderboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGame, setSelectedGame] = useState<string | null>(searchParams.get('game'));
  const [leaderboardData, setLeaderboardData] = useState<ScoreEntry[]>([]);
  
  useEffect(() => {
    // Filter data based on selected game
    if (selectedGame) {
      setLeaderboardData(
        SAMPLE_DATA.filter(entry => entry.game === selectedGame)
          .map((entry, index) => ({ ...entry, rank: index + 1 }))
      );
    } else {
      setLeaderboardData(SAMPLE_DATA);
    }
    
    // Update URL with selected game
    if (selectedGame) {
      setSearchParams({ game: selectedGame });
    } else {
      setSearchParams({});
    }
  }, [selectedGame, setSearchParams]);

  const handleSelectGame = (game: string | null) => {
    setSelectedGame(game);
  };

  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground mb-8">
            View and filter the top scores across all games
          </p>
          
          <div className="mb-6">
            <GameFilter 
              games={GAMES}
              selectedGame={selectedGame}
              onSelectGame={handleSelectGame}
            />
          </div>
          
          <LeaderboardTable data={leaderboardData} />
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
