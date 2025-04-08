
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GameStatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  progress?: number;
  color?: string;
}

const GameStatCard = ({ 
  title, 
  value, 
  icon,
  progress = 0,
  color = 'from-game-primary to-game-secondary'
}: GameStatCardProps) => {
  return (
    <Card className="game-stat-card animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-card flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {progress > 0 && (
          <div className="mt-2">
            <Progress 
              value={progress} 
              className={`h-1 bg-muted [&>div]:bg-gradient-to-r ${color}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {progress}% increase from last month
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameStatCard;
