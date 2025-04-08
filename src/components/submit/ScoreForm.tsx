
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

const GAMES = [
  "Cosmic Warfare",
  "Dragon Quest Legends",
  "Velocity Racer",
  "Tactical Ops",
  "Zombie Survival",
  "Medieval Kingdom"
];

const ScoreForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
      score: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Submitted score:", data);
      toast.success("Score submitted successfully!");
      form.reset();
      setIsSubmitting(false);
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
