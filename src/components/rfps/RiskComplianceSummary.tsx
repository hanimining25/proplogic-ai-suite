
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const RiskComplianceSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk/Compliance Summary</CardTitle>
        <CardDescription>View risk and compliance summaries for RFPs.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content for Risk/Compliance Summary goes here. This feature is under construction.</p>
      </CardContent>
    </Card>
  );
};

export default RiskComplianceSummary;
