
import React from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

const Login = () => {
  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-border bg-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <LogIn className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Login to access your account and track your scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
