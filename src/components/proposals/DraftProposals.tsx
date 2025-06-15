
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const DraftProposals = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Draft Proposals</CardTitle>
        <CardDescription>Manage and edit your draft proposals.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Draft Proposals goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default DraftProposals;
