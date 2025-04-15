
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MultiSelect, 
  MultiSelectTrigger, 
  MultiSelectValue, 
  MultiSelectContent, 
  MultiSelectItem 
} from '@/components/MultiSelect';
import { skills, hackathons, locations } from '@/data/mockData';
import { User } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { X, Plus, UserCircle, MapPin } from 'lucide-react';

const Profile = () => {
  const { currentUser, setCurrentUser } = useApp();
  const [formData, setFormData] = useState<User | null>(currentUser);
  
  if (!currentUser || !formData) {
    return <div>Loading...</div>;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSkillsChange = (newSkills: string[]) => {
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };
  
  const handleHackathonsChange = (newHackathons: string[]) => {
    setFormData({
      ...formData,
      hackathons: newHackathons,
    });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      location: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(formData);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto pt-24 pb-10 px-4">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground mb-8">
          Update your information to help others find you for hackathon collaborations.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your profile details and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Full Stack Developer"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell others about yourself, your experience, and what you're looking for"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <select
                      id="location"
                      className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                      value={formData.location}
                      onChange={handleLocationChange}
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <MultiSelect
                      value={formData.skills}
                      onValueChange={handleSkillsChange}
                    >
                      <MultiSelectTrigger>
                        <MultiSelectValue placeholder="Select your skills" />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        {skills.map(skill => (
                          <MultiSelectItem key={skill} value={skill}>
                            {skill}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectContent>
                    </MultiSelect>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Interested Hackathons</Label>
                    <MultiSelect
                      value={formData.hackathons}
                      onValueChange={handleHackathonsChange}
                    >
                      <MultiSelectTrigger>
                        <MultiSelectValue placeholder="Select hackathons you're interested in" />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        {hackathons.map(hackathon => (
                          <MultiSelectItem key={hackathon} value={hackathon}>
                            {hackathon}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectContent>
                    </MultiSelect>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          {/* Profile Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Preview</CardTitle>
                  <CardDescription>
                    How others will see your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={formData.avatar} alt={formData.name} />
                      <AvatarFallback>{formData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{formData.name}</h3>
                      <p className="text-muted-foreground">{formData.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{formData.location}</span>
                  </div>
                  
                  <div>
                    <p className="text-sm">{formData.bio}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {formData.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Interested Hackathons</h4>
                    <div className="flex flex-wrap gap-1">
                      {formData.hackathons.map(hackathon => (
                        <Badge key={hackathon} variant="outline" className="text-xs">
                          {hackathon}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
