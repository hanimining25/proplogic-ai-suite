
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const UsersTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles & Permissions</CardTitle>
        <CardDescription>Manage user roles and permissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for User Roles & Permissions goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default UsersTab;
