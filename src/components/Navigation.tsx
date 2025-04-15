
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Users, User } from 'lucide-react';

const Navigation = () => {
  const { currentUser } = useApp();
  const location = useLocation();

  return (
    <nav className="fixed w-full bg-background border-b border-border z-50">
      <div className="container flex justify-between items-center py-3">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl font-bold text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
              <path d="M16.5 9.4 7.5 4.21" />
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M3.27 6.96 12 12.01l8.73-5.05" />
              <path d="M12 22.08V12" />
            </svg>
            HackTeam
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/browse">
            <Button variant={location.pathname === '/browse' ? 'default' : 'ghost'} size="sm">
              <Users className="w-4 h-4 mr-2" />
              Browse
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant={location.pathname === '/messages' ? 'default' : 'ghost'} size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant={location.pathname === '/profile' ? 'default' : 'ghost'} size="sm">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </Link>
          
          {currentUser && (
            <Link to="/profile" className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
