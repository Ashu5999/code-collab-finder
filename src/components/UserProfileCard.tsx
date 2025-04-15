
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';
import { MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserProfileCardProps {
  user: User;
  isCurrentUser?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, isCurrentUser = false }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.title}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{user.location}</span>
        </div>
        
        <p className="text-sm mb-4 line-clamp-2">{user.bio}</p>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {user.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {user.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{user.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Interested Hackathons
          </h4>
          <div className="flex flex-wrap gap-1">
            {user.hackathons.slice(0, 2).map((hackathon) => (
              <Badge key={hackathon} variant="outline" className="text-xs">
                {hackathon}
              </Badge>
            ))}
            {user.hackathons.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{user.hackathons.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {isCurrentUser ? (
          <Button variant="outline" className="w-full" asChild>
            <Link to="/profile">Edit Profile</Link>
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link to={`/messages/${user.id}`}>Message</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
