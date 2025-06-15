
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRfps } from '@/data/rfps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RFPsTable } from '../rfps/RFPsTable';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const RecentRFPs = () => {
    const navigate = useNavigate();
    const { data: rfps, isLoading, isError, error } = useQuery({
        queryKey: ['rfps-recent'],
        queryFn: async () => {
            const allRfps = await getRfps();
            return allRfps.slice(0, 5);
        }
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent RFPs</CardTitle>
                    <CardDescription>The 5 most recently added RFPs.</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/rfps')}>View All</Button>
            </CardHeader>
            <CardContent>
                {isLoading && <Skeleton className="h-[200px] w-full" />}
                {isError && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                )}
                {rfps && <RFPsTable rfps={rfps} />}
            </CardContent>
        </Card>
    );
};

export default RecentRFPs;
