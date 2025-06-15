
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ReusableSections = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reusable Sections Library</CardTitle>
        <CardDescription>Manage your library of reusable proposal sections.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Reusable Sections Library goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default ReusableSections;
