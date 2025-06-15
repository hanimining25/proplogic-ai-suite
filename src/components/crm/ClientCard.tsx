
import React from 'react';
import { Building2, Globe, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Client } from '@/types/crm';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatRevenue = (revenue: number | null) => {
    if (revenue === null || revenue === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(revenue);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No contact yet';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-none">{client.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{client.industry || 'N/A'}</p>
            </div>
          </div>
          <Badge className={getStatusColor(client.status)}>
            {client.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{formatRevenue(client.annual_revenue)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{client.employee_count ? `${client.employee_count} employees` : 'N/A'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Health Score:</span>
            <span className={`font-semibold ${getHealthScoreColor(client.health_score)}`}>
              {client.health_score}%
            </span>
          </div>
          {client.health_score >= 80 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last contact: {formatDate(client.last_contact_date)}</span>
            {client.website && (
              <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Globe className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {client.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {(client.tags?.length ?? 0) > 3 && (
            <Badge variant="outline" className="text-xs">
              +{(client.tags?.length ?? 0) - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
