
import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockActivities, mockClients, mockContacts } from '@/data/mockCRMData';

const ActivityLogTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  const activitiesWithDetails = mockActivities.map(activity => ({
    ...activity,
    clientName: mockClients.find(c => c.id === activity.clientId)?.name || 'Unknown',
    contactName: activity.contactId 
      ? (() => {
          const contact = mockContacts.find(c => c.id === activity.contactId);
          return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
        })()
      : null
  }));

  const filteredActivities = activitiesWithDetails
    .filter(activity => {
      const matchesSearch = 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.teamMember.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || activity.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return b.date.getTime() - a.date.getTime();
      if (sortBy === 'client') return a.clientName.localeCompare(b.clientName);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const activityTypes = ['meeting', 'call', 'email', 'proposal', 'contract', 'note'];
  const stats = {
    total: mockActivities.length,
    today: mockActivities.filter(a => {
      const today = new Date();
      return a.date.toDateString() === today.toDateString();
    }).length,
    thisWeek: mockActivities.filter(a => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return a.date >= weekAgo;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
            <p className="text-sm text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.thisWeek}</div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="date">Sort by Date</option>
            <option value="client">Sort by Client</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Activity Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Team Member</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {activity.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(activity.type)}>
                    {activity.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{activity.clientName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {activity.contactName && (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{activity.contactName}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{activity.teamMember}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(activity.date)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {activity.outcome || '-'}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No activities found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLogTab;
