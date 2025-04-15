
import React from 'react';
import { useApp } from '@/context/AppContext';
import UserProfileCard from '@/components/UserProfileCard';
import UserFiltersSidebar from '@/components/UserFiltersSidebar';
import Navigation from '@/components/Navigation';

const Browse = () => {
  const { filteredUsers, currentUser } = useApp();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto pt-24 pb-10 px-4">
        <h1 className="text-3xl font-bold mb-2">Find Teammates</h1>
        <p className="text-muted-foreground mb-8">
          Browse potential teammates and connect with those who match your skills and interests.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="md:col-span-3">
            <div className="sticky top-24">
              <UserFiltersSidebar />
            </div>
          </div>
          
          {/* User Cards */}
          <div className="md:col-span-9">
            {filteredUsers.length === 0 ? (
              <div className="bg-card p-8 rounded-lg border border-border text-center">
                <h3 className="text-xl font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find more teammates.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                  <UserProfileCard 
                    key={user.id} 
                    user={user} 
                    isCurrentUser={currentUser?.id === user.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
