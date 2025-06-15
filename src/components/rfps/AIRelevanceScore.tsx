
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AIRelevanceScore = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Relevance Score</CardTitle>
        <CardDescription>View AI-powered relevance scores for your RFPs.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for AI Relevance Score goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default AIRelevanceScore;
