
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RFPFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const capitalize = (s: string) => {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
};

const statuses = ['all', 'new', 'in_progress', 'submitted', 'won', 'lost', 'archived'];

export const RFPFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: RFPFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search by title or client..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-xs"
      />
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {capitalize(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
