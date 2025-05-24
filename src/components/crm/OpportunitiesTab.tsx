
import React, { useState } from 'react';
import { Search, Filter, Plus, DollarSign, Calendar, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockOpportunities, mockClients } from '@/data/mockCRMData';

const OpportunitiesTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');

  const opportunitiesWithClients = mockOpportunities.map(opp => ({
    ...opp,
    clientName: mockClients.find(c => c.id === opp.clientId)?.name || 'Unknown'
  }));

  const filteredOpportunities = opportunitiesWithClients.filter(opp => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || opp.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'discovery': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed-won': return 'bg-green-100 text-green-800';
      case 'closed-lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const stats = {
    total: mockOpportunities.length,
    totalValue: mockOpportunities.reduce((sum, opp) => sum + opp.value, 0),
    avgValue: mockOpportunities.reduce((sum, opp) => sum + opp.value, 0) / mockOpportunities.length,
    weightedValue: mockOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0),
    activeOpps: mockOpportunities.filter(opp => !opp.stage.includes('closed')).length
  };

  const stages = ['discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.activeOpps}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.weightedValue)}</div>
            <p className="text-sm text-muted-foreground">Weighted Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{formatCurrency(stats.avgValue)}</div>
            <p className="text-sm text-muted-foreground">Avg Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>
                {stage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Opportunity
        </Button>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{opportunity.clientName}</p>
                </div>
                <Badge className={getStageColor(opportunity.stage)}>
                  {opportunity.stage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{opportunity.description}</p>

              {/* Value and Probability */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{formatCurrency(opportunity.value)}</div>
                    <div className="text-xs text-muted-foreground">Value</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className={`font-semibold ${getProbabilityColor(opportunity.probability)}`}>
                      {opportunity.probability}%
                    </div>
                    <div className="text-xs text-muted-foreground">Probability</div>
                  </div>
                </div>
              </div>

              {/* Progress bar for probability */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Win Probability</span>
                  <span className={getProbabilityColor(opportunity.probability)}>
                    {opportunity.probability}%
                  </span>
                </div>
                <Progress value={opportunity.probability} className="h-2" />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Expected Close</div>
                    <div>{formatDate(opportunity.expectedCloseDate)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Created</div>
                    <div>{formatDate(opportunity.createdAt)}</div>
                  </div>
                </div>
              </div>

              {/* Team Member */}
              <div className="pt-2 border-t">
                <div className="text-sm">
                  <span className="text-muted-foreground">Owner: </span>
                  <span className="font-medium">{opportunity.teamMember}</span>
                </div>
              </div>

              {/* Tags */}
              {opportunity.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {opportunity.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No opportunities found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesTab;
