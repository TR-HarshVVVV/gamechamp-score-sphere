
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpDown,
  Search,
  Trophy,
} from 'lucide-react';

export type ScoreEntry = {
  id: string;
  rank: number;
  player: string;
  game: string;
  score: number;
  date: string;
};

interface LeaderboardTableProps {
  data: ScoreEntry[];
}

const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
  const [sortField, setSortField] = useState<'rank' | 'score' | 'date'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: 'rank' | 'score' | 'date') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const filteredData = sortedData.filter(
    (entry) =>
      entry.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search player or game..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead
                className="w-[80px] cursor-pointer"
                onClick={() => handleSort('rank')}
              >
                <div className="flex items-center">
                  Rank
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Game</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center">
                  Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center justify-end">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-muted/10 animate-fade-in">
                  <TableCell>
                    <div className="flex justify-center items-center">
                      {entry.rank <= 3 ? (
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full 
                          ${entry.rank === 1 ? 'bg-amber-500/20 text-amber-500' : 
                            entry.rank === 2 ? 'bg-gray-300/20 text-gray-300' : 
                            'bg-amber-700/20 text-amber-700'
                          }`}
                        >
                          <Trophy className="h-4 w-4" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground font-medium">{entry.rank}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{entry.player}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-muted text-foreground">
                      {entry.game}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono font-medium">
                    {entry.score.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {entry.date}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
