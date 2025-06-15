import React, { useState } from 'react';
import { Search, Phone, Mail, User, Building, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { getContacts, ContactWithClient } from '@/data/contacts';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ContactsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  
  const { data: contacts = [], isLoading, isError, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const filteredContacts = contacts.filter((contact: ContactWithClient) => {
    const clientName = contact.clients?.name || '';
    const matchesSearch = 
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || contact.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'primary': return 'bg-blue-100 text-blue-800';
      case 'secondary': return 'bg-green-100 text-green-800';
      case 'stakeholder': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const stats = {
    total: contacts.length,
    primary: contacts.filter(c => c.role === 'primary').length,
    stakeholders: contacts.filter(c => c.role === 'stakeholder').length
  };

  if (isLoading) {
    return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[76px]" />)}
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[400px] w-full" />
    </div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Loading Contacts</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.primary}</div>
            <p className="text-sm text-muted-foreground">Primary Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.stakeholders}</div>
            <p className="text-sm text-muted-foreground">Stakeholders</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Roles</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="stakeholder">Stakeholder</option>
          </select>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Contacts Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Communication</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{contact.first_name} {contact.last_name}</div>
                      <div className="text-sm text-muted-foreground">{contact.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{contact.clients?.name || 'Unknown'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleColor(contact.role)}>
                    {contact.role}
                  </Badge>
                </TableCell>
                <TableCell>{contact.department}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {contact.communication_preference === 'email' && <Mail className="h-4 w-4" />}
                    {contact.communication_preference === 'phone' && <Phone className="h-4 w-4" />}
                    <span className="text-sm">{contact.email}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(contact.last_contact_date)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No contacts found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ContactsTab;
