
import React, { useState } from 'react';
import { Calendar, Filter, Search, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockActivities, mockClients, mockContacts } from '@/data/mockCRMData';
import TimelineItem from './TimelineItem';

const EngagementTimelineTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterClient, setFilterClient] = useState<string>('all');

  const activitiesWithDetails = mockActivities.map(activity => ({
    ...activity,
    clientName: mockClients.find(c => c.id === activity.clientId)?.name || 'Unknown',
    contactName: activity.contactId 
      ? (() => {
          const contact = mockContacts.find(c => c.id === activity.contactId);
          return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
        })()
      : null
  })).sort((a, b) => b.date.getTime() - a.date.getTime());

  const filteredActivities = activitiesWithDetails.filter(activity => {
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesClient = filterClient === 'all' || activity.clientId === filterClient;
    return matchesSearch && matchesType && matchesClient;
  });

  const activityTypes = ['meeting', 'call', 'email', 'proposal', 'contract', 'note'];
  const stats = {
    total: mockActivities.length,
    thisWeek: mockActivities.filter(a => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return a.date >= weekAgo;
    }).length,
    meetings: mockActivities.filter(a => a.type === 'meeting').length,
    proposals: mockActivities.filter(a => a.type === 'proposal').length
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.thisWeek}</div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.meetings}</div>
            <p className="text-sm text-muted-foreground">Meetings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.proposals}</div>
            <p className="text-sm text-muted-foreground">Proposals</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Types</option>
            {activityTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Clients</option>
            {mockClients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {filteredActivities.map((activity, index) => (
          <TimelineItem 
            key={activity.id} 
            activity={activity} 
            isLast={index === filteredActivities.length - 1}
          />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No activities found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EngagementTimelineTab;
