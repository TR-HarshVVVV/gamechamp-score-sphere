
import React from 'react';
import Layout from '@/components/layout/Layout';
import ScoreForm from '@/components/submit/ScoreForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

const SubmitScore = () => {
  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-border bg-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Submit Your Score</CardTitle>
              <CardDescription>
                Add your high score to the leaderboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScoreForm />
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              All scores are verified by our system to ensure fair competition.
              <br />
              Please submit legitimate scores only.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitScore;
