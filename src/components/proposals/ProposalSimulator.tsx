
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProposals } from '@/data/proposals';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { Proposal } from '@/types/dashboard';
import StatsCard from '@/components/dashboard/StatsCard';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

const ProposalSimulator = () => {
  const { data: proposals, isLoading, isError, error } = useQuery<Proposal[]>({
    queryKey: ['proposals'],
    queryFn: getProposals,
  });

  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [simulatedProbability, setSimulatedProbability] = useState<number | null>(null);

  const selectedProposal = useMemo(() => {
    if (!proposals || !selectedProposalId) return null;
    return proposals.find(p => p.id === selectedProposalId);
  }, [proposals, selectedProposalId]);

  const { originalTotalExpectedValue, simulatedTotalExpectedValue, difference } = useMemo(() => {
    if (!proposals) return { originalTotalExpectedValue: 0, simulatedTotalExpectedValue: 0, difference: 0 };
    
    const originalTotalExpectedValue = proposals.reduce((acc, p) => acc + (p.value * (p.probability / 100)), 0);

    if (!selectedProposal || simulatedProbability === null) {
      return { originalTotalExpectedValue, simulatedTotalExpectedValue: originalTotalExpectedValue, difference: 0 };
    }

    const originalSelectedExpectedValue = selectedProposal.value * (selectedProposal.probability / 100);
    const simulatedSelectedExpectedValue = selectedProposal.value * ((simulatedProbability) / 100);

    const simulatedTotalExpectedValue = originalTotalExpectedValue - originalSelectedExpectedValue + simulatedSelectedExpectedValue;
    const difference = simulatedTotalExpectedValue - originalTotalExpectedValue;

    return { originalTotalExpectedValue, simulatedTotalExpectedValue, difference };
  }, [proposals, selectedProposal, simulatedProbability]);

  const handleProposalSelect = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    const proposal = proposals?.find(p => p.id === proposalId);
    if (proposal) {
      setSimulatedProbability(proposal.probability);
    }
  };

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Proposal Simulator</CardTitle>
                <CardDescription>Simulate proposal outcomes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    )
  }

  if (isError) {
    return (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error loading proposals</AlertTitle>
            <AlertDescription>{(error as Error).message}</AlertDescription>
        </Alert>
    )
  }
  
  return (
    <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Simulation Setup</CardTitle>
                <CardDescription>Select a proposal and adjust its win probability.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label htmlFor="proposal-select" className="text-sm font-medium mb-2 block">
                        Select Proposal
                    </label>
                    <Select onValueChange={handleProposalSelect} value={selectedProposalId ?? undefined}>
                        <SelectTrigger id="proposal-select">
                            <SelectValue placeholder="Choose a proposal..." />
                        </SelectTrigger>
                        <SelectContent>
                            {proposals?.map(p => (
                                <SelectItem key={p.id} value={p.id}>
                                    {p.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedProposal && (
                    <div className="space-y-4 pt-4 border-t">
                        <div>
                            <h4 className="font-medium">{selectedProposal.title}</h4>
                            <p className="text-sm text-muted-foreground">Value: {formatCurrency(selectedProposal.value)}</p>
                            <p className="text-sm text-muted-foreground">Original Probability: {selectedProposal.probability}%</p>
                            <p className="text-sm text-muted-foreground">Original Expected Value: {formatCurrency(selectedProposal.value * (selectedProposal.probability / 100))}</p>
                        </div>
                        <div>
                             <label htmlFor="probability-slider" className="text-sm font-medium mb-2 block">
                                Simulated Win Probability: <span className="font-bold">{simulatedProbability}%</span>
                            </label>
                            <Slider
                                id="probability-slider"
                                min={0}
                                max={100}
                                step={1}
                                value={[simulatedProbability ?? 0]}
                                onValueChange={(value) => setSimulatedProbability(value[0])}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Simulated Expected Value: <span className="font-bold">{formatCurrency(selectedProposal.value * ((simulatedProbability ?? 0) / 100))}</span></p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Simulation Results</CardTitle>
                <CardDescription>The impact of your changes on the total expected pipeline value.</CardDescription>
            </CardHeader>
            <CardContent>
                 {!selectedProposal ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 border rounded-lg h-full bg-muted/20">
                        <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Awaiting Simulation</h3>
                        <p className="text-muted-foreground">Select a proposal to start simulating outcomes.</p>
                    </div>
                 ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatsCard
                            title="Original Pipeline Value"
                            value={formatCurrency(originalTotalExpectedValue)}
                            description="Total expected value of all proposals"
                            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                        />
                        <StatsCard
                            title="Simulated Pipeline Value"
                            value={formatCurrency(simulatedTotalExpectedValue)}
                            description="Pipeline value with your change"
                            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
                        />
                         <StatsCard
                            title="Impact"
                            value={formatCurrency(difference)}
                            description="Change in expected value"
                            icon={
                                difference === 0 ? <Percent className="h-4 w-4 text-muted-foreground" /> :
                                difference > 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> :
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            }
                        />
                    </div>
                 )}
            </CardContent>
        </Card>
    </div>
  );
};

export default ProposalSimulator;
