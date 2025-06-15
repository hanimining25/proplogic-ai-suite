
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CompanySettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Settings</CardTitle>
        <CardDescription>Manage your company's information.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Company Settings goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default CompanySettingsTab;
