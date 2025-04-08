
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import TrendingGames from '@/components/home/TrendingGames';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrendingGames />
    </Layout>
  );
};

export default Index;
