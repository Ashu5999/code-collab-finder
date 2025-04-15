
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserSearch, Puzzle, Globe, Code, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the Perfect Teammates for Your Next Hackathon</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            Connect with developers, designers, and creators who share your passion for building amazing projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/browse">
                <UserSearch className="mr-2 h-5 w-5" />
                Find Teammates
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/profile">
                Create Your Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">
                List your skills, interests, and the hackathons you want to participate in.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mb-4">
                <UserSearch className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Teammates</h3>
              <p className="text-muted-foreground">
                Find teammates with complementary skills and shared hackathon interests.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Build Something Amazing</h3>
              <p className="text-muted-foreground">
                Connect and collaborate with your new team to create innovative projects.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Hackathons Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Hackathons</h2>
            <Button variant="outline" asChild>
              <Link to="/browse">View All</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
                <Puzzle className="h-16 w-16 text-white opacity-75" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">HackSF 2025</h3>
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">In Person</div>
                </div>
                <div className="text-sm text-muted-foreground mb-4 flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  San Francisco, CA
                </div>
                <p className="text-sm mb-4">
                  Join us for the biggest hackathon in San Francisco. Prizes worth $50,000!
                </p>
                <Button className="w-full" asChild>
                  <Link to="/browse">Find Teammates</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
              <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center p-6">
                <Puzzle className="h-16 w-16 text-white opacity-75" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">CodeJam Online</h3>
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Remote</div>
                </div>
                <div className="text-sm text-muted-foreground mb-4 flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  Virtual
                </div>
                <p className="text-sm mb-4">
                  A 48-hour virtual hackathon focused on solving real-world problems with code.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/browse">Find Teammates</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
              <div className="h-40 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center p-6">
                <Puzzle className="h-16 w-16 text-white opacity-75" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">AIHack London</h3>
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">In Person</div>
                </div>
                <div className="text-sm text-muted-foreground mb-4 flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  London, UK
                </div>
                <p className="text-sm mb-4">
                  The premier AI hackathon in Europe. Build innovative AI solutions with like-minded creators.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/browse">Find Teammates</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Team?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss out on the perfect collaboration opportunity. Join HackTeam today!
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <Link to="/browse">
              Get Started Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
