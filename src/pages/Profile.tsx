
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Code, Github, BookOpen, Star, GitFork, User, ExternalLink, MapPin, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  email: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  created_at: string;
}

// Fetch GitHub user information
const fetchGitHubUser = async (): Promise<GitHubUser> => {
  const response = await fetch('https://api.github.com/users/nilesh896');
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
};

// Fetch GitHub repositories
const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch('https://api.github.com/users/nilesh896/repos?sort=updated');
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
};

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-red-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-pink-500',
  PHP: 'bg-purple-500',
  Ruby: 'bg-red-600',
  'C#': 'bg-green-600',
  'C++': 'bg-blue-600',
  Go: 'bg-blue-400',
  Rust: 'bg-orange-600',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-400',
  Dart: 'bg-blue-300',
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
};

const Profile = () => {
  // Fetch GitHub user data
  const { 
    data: userData, 
    isLoading: userLoading, 
    error: userError 
  } = useQuery({
    queryKey: ['githubUser'],
    queryFn: fetchGitHubUser,
  });
  
  // Fetch GitHub repositories
  const { 
    data: reposData, 
    isLoading: reposLoading, 
    error: reposError 
  } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchGitHubRepos,
  });

  const isLoading = userLoading || reposLoading;
  const hasError = userError || reposError;

  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          {hasError && (
            <div className="p-4 mb-6 rounded-lg bg-destructive/10 text-destructive">
              <p>Failed to load GitHub profile data. Please try again later.</p>
            </div>
          )}

          {/* User Profile Card */}
          <div className="mb-12">
            {isLoading ? (
              <div className="flex flex-col md:flex-row gap-8 p-6 rounded-xl bg-card border border-border animate-pulse">
                <Skeleton className="w-32 h-32 rounded-full" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-full max-w-md" />
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            ) : userData && (
              <Card className="overflow-hidden border-primary/20 shadow-xl hover:shadow-primary/10 transition-all">
                <div className="h-32 bg-gradient-to-r from-game-primary to-game-secondary"></div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16">
                    <Avatar className="w-32 h-32 border-4 border-background">
                      <AvatarImage src={userData.avatar_url} alt={userData.name} />
                      <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pt-4 md:pt-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold">{userData.name}</h2>
                          <p className="text-muted-foreground">@{userData.login}</p>
                        </div>
                        <a 
                          href={userData.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md hover:bg-primary/10 transition-colors"
                        >
                          <Github size={18} />
                          <span>View on GitHub</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      {userData.bio && <p className="text-lg mb-4">{userData.bio}</p>}
                      
                      <div className="flex flex-wrap gap-4 mt-2">
                        {userData.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin size={16} />
                            <span>{userData.location}</span>
                          </div>
                        )}
                        
                        {userData.email && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail size={16} />
                            <span>{userData.email}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={16} />
                          <span>Joined {formatDate(userData.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <p className="text-2xl font-bold">{userData.public_repos}</p>
                        <p className="text-muted-foreground">Repositories</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <p className="text-2xl font-bold">{userData.followers}</p>
                        <p className="text-muted-foreground">Followers</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <p className="text-2xl font-bold">{userData.following}</p>
                        <p className="text-muted-foreground">Following</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Repositories List */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen size={24} className="text-primary" />
              Repositories
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : reposData && reposData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reposData.slice(0, 6).map((repo) => (
                  <Card 
                    key={repo.id} 
                    className="border border-border hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden group"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code size={18} className="text-primary" />
                          <span className="truncate">{repo.name}</span>
                        </div>
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {repo.description && (
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 items-center">
                        {repo.language && (
                          <Badge 
                            variant="outline" 
                            className={`flex items-center gap-1 ${
                              languageColors[repo.language] || 'bg-gray-500'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-current"></span>
                            {repo.language}
                          </Badge>
                        )}
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star size={14} />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <GitFork size={14} />
                          <span>{repo.forks_count}</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground ml-auto">
                          Updated {formatDate(repo.updated_at)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed border-border rounded-lg">
                <User size={48} className="mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No repositories found</h3>
                <p className="text-muted-foreground">
                  This user hasn't created any public repositories yet.
                </p>
              </div>
            )}
            
            {reposData && reposData.length > 6 && (
              <div className="mt-8 text-center">
                <a 
                  href={userData?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <span>View all repositories</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
          
          <div className="mt-20 p-8 text-center border-t border-border">
            <p className="text-muted-foreground">
              Data fetched from GitHub API. Last updated {new Date().toLocaleTimeString()}.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
