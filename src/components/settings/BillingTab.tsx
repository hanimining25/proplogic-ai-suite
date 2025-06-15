
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const BillingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription & Billing</CardTitle>
        <CardDescription>Manage your subscription and billing details.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Subscription & Billing goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
