
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GameFilterProps {
  games: string[];
  selectedGame: string | null;
  onSelectGame: (game: string | null) => void;
}

const GameFilter = ({ games, selectedGame, onSelectGame }: GameFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter by Game
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuItem 
            className={`flex items-center justify-between ${!selectedGame ? 'bg-accent/50' : ''}`}
            onClick={() => onSelectGame(null)}
          >
            All Games
            {!selectedGame && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          
          {games.map((game) => (
            <DropdownMenuItem
              key={game}
              className={`flex items-center justify-between ${selectedGame === game ? 'bg-accent/50' : ''}`}
              onClick={() => onSelectGame(game)}
            >
              {game}
              {selectedGame === game && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {selectedGame && (
        <Badge 
          variant="outline"
          className="gap-1 px-3 py-1 bg-card/80 hover:bg-card cursor-pointer"
          onClick={() => onSelectGame(null)}
        >
          {selectedGame}
          <span className="text-xs">×</span>
        </Badge>
      )}
    </div>
  );
};

export default GameFilter;
