import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import TrendingGames from '@/components/home/TrendingGames';
import { ScoreEntry } from '@/components/leaderboard/LeaderboardTable';

const sortAndRankScores = (scores: ScoreEntry[]): ScoreEntry[] => {
  return [...scores]
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
};

const Index = () => {
  const [topPlayers, setTopPlayers] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const sampleData = [
      { id: '1', rank: 1, player: 'NinjaWarrior', game: 'Cosmic Warfare', score: 98540, date: '2023-04-05' },
      { id: '2', rank: 2, player: 'EpicGamer42', game: 'Cosmic Warfare', score: 87220, date: '2023-04-07' },
      { id: '3', rank: 3, player: 'ProSniper', game: 'Dragon Quest Legends', score: 76890, date: '2023-04-02' },
    ];
    
    const storedScores = JSON.parse(localStorage.getItem('leaderboardScores') || '[]');
    
    const combinedScores = sortAndRankScores([...sampleData, ...storedScores]);
    setTopPlayers(combinedScores.slice(0, 3)); 
  }, []);
  
  useEffect(() => {
    const handleScoreSubmitted = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newScore = customEvent.detail;
      
      if (newScore) {
        console.log("New score received on home page:", newScore);
        
        setTopPlayers(prevPlayers => {
          const sampleData = [
            { id: '1', rank: 1, player: 'NinjaWarrior', game: 'Cosmic Warfare', score: 98540, date: '2023-04-05' },
            { id: '2', rank: 2, player: 'EpicGamer42', game: 'Cosmic Warfare', score: 87220, date: '2023-04-07' },
            { id: '3', rank: 3, player: 'ProSniper', game: 'Dragon Quest Legends', score: 76890, date: '2023-04-02' },
          ];
          
          const storedScores = JSON.parse(localStorage.getItem('leaderboardScores') || '[]');
          
          const combinedScores = sortAndRankScores([...sampleData, ...storedScores]);
          return combinedScores.slice(0, 3);
        });
      }
    };
    
    window.addEventListener('scoreSubmitted', handleScoreSubmitted);
    
    return () => {
      window.removeEventListener('scoreSubmitted', handleScoreSubmitted);
    };
  }, []);

  return (
    <Layout>
      <HeroSection topPlayers={topPlayers} />
      <TrendingGames />
    </Layout>
  );
};

export default Index;
