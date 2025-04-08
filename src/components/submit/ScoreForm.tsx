
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  game: z.string({
    required_error: "Please select a game",
  }),
  playerName: z.string().min(2, {
    message: "Player name must be at least 2 characters",
  }),
  score: z.coerce.number().positive({
    message: "Score must be a positive number",
  }),
});

// Use this array in both ScoreForm and Leaderboard
export const GAMES = [
  "Cosmic Warfare",
  "Dragon Quest Legends",
  "Velocity Racer",
  "Tactical Ops",
  "Zombie Survival",
  "Medieval Kingdom"
];

// Event bus for real-time updates
export const scoreSubmitEvent = new CustomEvent('scoreSubmitted', { detail: null });

const ScoreForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
      score: undefined,
      game: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Generate a unique ID for the new score entry
    const newScoreEntry = {
      id: Date.now().toString(),
      player: data.playerName,
      game: data.game,
      score: data.score,
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      rank: 0, // Will be calculated on the leaderboard
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Submitted score:", newScoreEntry);
      
      // Store in localStorage for persistence between refreshes
      const existingScores = JSON.parse(localStorage.getItem('leaderboardScores') || '[]');
      const updatedScores = [...existingScores, newScoreEntry];
      localStorage.setItem('leaderboardScores', JSON.stringify(updatedScores));
      
      // Create and dispatch custom event with the new score
      scoreSubmitEvent.detail = newScoreEntry;
      window.dispatchEvent(scoreSubmitEvent);
      
      toast.success("Score submitted successfully!");
      
      // Reset the form properly with complete defaultValues
      form.reset({
        playerName: "",
        score: undefined,
        game: undefined,
      });
      
      setIsSubmitting(false);
      
      // Redirect to leaderboard to see the new score
      navigate('/leaderboard');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="game"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Select a game" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GAMES.map((game) => (
                      <SelectItem key={game} value={game}>
                        {game}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="playerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Player Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your player name" 
                    {...field}
                    className="bg-card border-border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter your score" 
                    {...field}
                    className="bg-card border-border"
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full btn-game"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Score"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ScoreForm;
