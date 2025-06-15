
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AIWritingAssistant = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Writing Assistant</CardTitle>
        <CardDescription>Get help from AI to write proposal content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for AI Writing Assistant goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default AIWritingAssistant;
