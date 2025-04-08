
import React from 'react';
import Layout from '@/components/layout/Layout';
import SignupForm from '@/components/auth/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

const Signup = () => {
  return (
    <Layout>
      <div className="container px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-border bg-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>
                Join GameChamp to submit scores and track your rankings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
