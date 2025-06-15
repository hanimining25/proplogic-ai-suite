
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const LocalizationTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Localization</CardTitle>
        <CardDescription>Manage localization settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Localization goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default LocalizationTab;
