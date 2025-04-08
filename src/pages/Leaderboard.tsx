
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import LeaderboardTable, { ScoreEntry } from '@/components/leaderboard/LeaderboardTable';
import GameFilter from '@/components/leaderboard/GameFilter';
import { useSearchParams } from 'react-router-dom';
import { GAMES } from '@/components/submit/ScoreForm';

// Sample leaderboard data
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

// Function to sort and rank scores
const sortAndRankScores = (scores: ScoreEntry[]): ScoreEntry[] => {
  return [...scores]
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
};

// Function to notify other components of leaderboard changes
const broadcastLeaderboardUpdate = (scores: ScoreEntry[]) => {
  // Create a custom event for leaderboard updates
  const leaderboardUpdateEvent = new CustomEvent('leaderboardUpdate', { 
    detail: scores 
  });
  
  // Dispatch the event
  window.dispatchEvent(leaderboardUpdateEvent);
};

const Leaderboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGame, setSelectedGame] = useState<string | null>(searchParams.get('game'));
  const [leaderboardData, setLeaderboardData] = useState<ScoreEntry[]>([]);
  const [allScores, setAllScores] = useState<ScoreEntry[]>([]);
  
  // Initialize with sample data and localStorage data
  useEffect(() => {
    // Get scores from localStorage (if any)
    const storedScores = JSON.parse(localStorage.getItem('leaderboardScores') || '[]');
    
    // Combine sample data with user-submitted scores
    const combinedScores = [...SAMPLE_DATA, ...storedScores];
    
    // Set all scores with proper ranking
    const rankedScores = sortAndRankScores(combinedScores);
    setAllScores(rankedScores);
    
    // Broadcast the initial leaderboard state for other components
    broadcastLeaderboardUpdate(rankedScores);
  }, []);
  
  // Filter scores based on selected game
  useEffect(() => {
    if (selectedGame) {
      setLeaderboardData(
        allScores.filter(entry => entry.game === selectedGame)
          .map((entry, index) => ({ ...entry, rank: index + 1 }))
      );
      setSearchParams({ game: selectedGame });
    } else {
      setLeaderboardData(allScores);
      setSearchParams({});
    }
  }, [selectedGame, allScores, setSearchParams]);

  // Listen for score submission events
  useEffect(() => {
    const handleScoreSubmitted = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newScore = customEvent.detail;
      
      if (newScore) {
        console.log("New score received on leaderboard:", newScore);
        
        // Add new score to all scores and re-rank
        setAllScores(prevScores => {
          const updatedScores = sortAndRankScores([...prevScores, newScore]);
          
          // Broadcast the updated leaderboard
          broadcastLeaderboardUpdate(updatedScores);
          
          return updatedScores;
        });
      }
    };
    
    window.addEventListener('scoreSubmitted', handleScoreSubmitted);
    
    return () => {
      window.removeEventListener('scoreSubmitted', handleScoreSubmitted);
    };
  }, []);

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
