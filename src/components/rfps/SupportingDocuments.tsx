
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const SupportingDocuments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supporting Documents</CardTitle>
        <CardDescription>Manage supporting documents for RFPs.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Supporting Documents goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default SupportingDocuments;
