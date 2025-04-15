
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  MultiSelect, 
  MultiSelectTrigger, 
  MultiSelectValue, 
  MultiSelectContent, 
  MultiSelectItem 
} from '@/components/MultiSelect';
import { useApp } from '@/context/AppContext';
import { hackathons, skills, locations } from '@/data/mockData';
import { Search, Filter, X } from 'lucide-react';

const UserFiltersSidebar = () => {
  const { filters, setFilters, users, setFilteredUsers } = useApp();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({...filters, search: e.target.value});
  };
  
  const applyFilters = () => {
    const filtered = users.filter(user => {
      // Apply search filter
      const searchMatch = !filters.search || 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.bio.toLowerCase().includes(filters.search.toLowerCase());
      
      // Apply skills filter
      const skillsMatch = filters.skills.length === 0 || 
        filters.skills.some(skill => user.skills.includes(skill));
      
      // Apply locations filter
      const locationsMatch = filters.locations.length === 0 || 
        filters.locations.includes(user.location);
      
      // Apply hackathons filter
      const hackathonsMatch = filters.hackathons.length === 0 || 
        filters.hackathons.some(hackathon => user.hackathons.includes(hackathon));
      
      return searchMatch && skillsMatch && locationsMatch && hackathonsMatch;
    });
    
    setFilteredUsers(filtered);
  };
  
  const clearFilters = () => {
    setFilters({
      skills: [],
      locations: [],
      hackathons: [],
      search: '',
    });
    setFilteredUsers(users);
  };
  
  React.useEffect(() => {
    applyFilters();
  }, [filters]);
  
  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <div className="space-y-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name, title, or bio..."
              className="pl-8"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div>
          <Label>Skills</Label>
          <MultiSelect
            value={filters.skills}
            onValueChange={(value) => setFilters({...filters, skills: value})}
          >
            <MultiSelectTrigger>
              <MultiSelectValue placeholder="Select skills" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              {skills.map((skill) => (
                <MultiSelectItem key={skill} value={skill}>
                  {skill}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          </MultiSelect>
        </div>
        
        <div>
          <Label>Locations</Label>
          <MultiSelect
            value={filters.locations}
            onValueChange={(value) => setFilters({...filters, locations: value})}
          >
            <MultiSelectTrigger>
              <MultiSelectValue placeholder="Select locations" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              {locations.map((location) => (
                <MultiSelectItem key={location} value={location}>
                  {location}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          </MultiSelect>
        </div>
        
        <div>
          <Label>Hackathons</Label>
          <MultiSelect
            value={filters.hackathons}
            onValueChange={(value) => setFilters({...filters, hackathons: value})}
          >
            <MultiSelectTrigger>
              <MultiSelectValue placeholder="Select hackathons" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              {hackathons.map((hackathon) => (
                <MultiSelectItem key={hackathon} value={hackathon}>
                  {hackathon}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          </MultiSelect>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={clearFilters} className="flex-1">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
          <Button size="sm" onClick={applyFilters} className="flex-1">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFiltersSidebar;
