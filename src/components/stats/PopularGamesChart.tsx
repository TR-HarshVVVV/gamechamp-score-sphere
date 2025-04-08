
import React from 'react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PopularGamesChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const PopularGamesChart = ({ data }: PopularGamesChartProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Most Played Games</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240 17% 14%)',
                  borderColor: 'hsl(217 19% 27%)', 
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '0.875rem',
                }}
              />
              <Bar 
                dataKey="value" 
                name="Players" 
                fill="url(#colorGradient)" 
                radius={[4, 4, 0, 0]} 
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularGamesChart;
