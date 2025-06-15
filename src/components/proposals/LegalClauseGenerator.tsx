
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const LegalClauseGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Clause Generator</CardTitle>
        <CardDescription>Generate legal clauses for your proposals.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Legal Clause Generator goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default LegalClauseGenerator;
