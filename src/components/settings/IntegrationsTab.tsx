
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const IntegrationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Integrations</CardTitle>
        <CardDescription>Configure API integrations.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for API Integrations goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default IntegrationsTab;
