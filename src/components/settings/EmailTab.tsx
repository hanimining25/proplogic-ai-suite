
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const EmailTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Templates & Workflows</CardTitle>
        <CardDescription>Configure email templates and workflows.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Email Templates & Workflows goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default EmailTab;
