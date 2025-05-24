
import React from 'react';
import { Calendar, User, Building, MessageSquare, Phone, Mail, FileText, FileCheck, StickyNote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClientActivity } from '@/types/crm';

interface TimelineItemProps {
  activity: ClientActivity & { clientName: string; contactName: string | null };
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ activity, isLast }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <MessageSquare className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'proposal': return <FileText className="h-4 w-4" />;
      case 'contract': return <FileCheck className="h-4 w-4" />;
      case 'note': return <StickyNote className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'call': return 'bg-green-500';
      case 'email': return 'bg-yellow-500';
      case 'proposal': return 'bg-purple-500';
      case 'contract': return 'bg-red-500';
      case 'note': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-yellow-100 text-yellow-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'contract': return 'bg-red-100 text-red-800';
      case 'note': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="flex">
      {/* Timeline line and icon */}
      <div className="flex flex-col items-center mr-4">
        <div className={`w-8 h-8 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center text-white`}>
          {getActivityIcon(activity.type)}
        </div>
        {!isLast && <div className="w-0.5 h-16 bg-border mt-2"></div>}
      </div>

      {/* Content */}
      <Card className="flex-1">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{activity.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(activity.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building className="h-3 w-3" />
                  <span>{activity.clientName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{activity.teamMember}</span>
                </div>
              </div>
            </div>
            <Badge className={getTypeColor(activity.type)}>
              {activity.type}
            </Badge>
          </div>

          <p className="text-muted-foreground mb-3">{activity.description}</p>

          {activity.contactName && (
            <div className="mb-3">
              <span className="text-sm font-medium">Contact: </span>
              <span className="text-sm text-muted-foreground">{activity.contactName}</span>
            </div>
          )}

          {activity.outcome && (
            <div className="mb-3">
              <span className="text-sm font-medium">Outcome: </span>
              <span className="text-sm text-muted-foreground">{activity.outcome}</span>
            </div>
          )}

          {activity.nextSteps && (
            <div className="mb-3">
              <span className="text-sm font-medium">Next Steps: </span>
              <span className="text-sm text-muted-foreground">{activity.nextSteps}</span>
            </div>
          )}

          {activity.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {activity.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineItem;
