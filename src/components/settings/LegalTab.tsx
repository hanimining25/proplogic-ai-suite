
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const LegalTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal & Compliance</CardTitle>
        <CardDescription>Manage legal and compliance settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Legal & Compliance goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default LegalTab;
