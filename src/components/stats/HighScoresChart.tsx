
import React from 'react';
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HighScoresChartProps {
  data: {
    name: string;
    Cosmic: number;
    Dragon: number;
    Tactical: number;
  }[];
}

const HighScoresChart = ({ data }: HighScoresChartProps) => {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle>Record High Scores Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
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
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240 17% 14%)',
                  borderColor: 'hsl(217 19% 27%)', 
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '0.875rem',
                }}
                formatter={(value) => [`${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Cosmic" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="Dragon" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="Tactical" 
                stroke="#d946ef" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighScoresChart;
