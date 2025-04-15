
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import MessagesSidebar from '@/components/MessagesSidebar';
import ChatInterface from '@/components/ChatInterface';

const Messages = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser, conversations } = useApp();
  
  React.useEffect(() => {
    // If no userId is provided and there are conversations, redirect to the first conversation
    if (!userId && currentUser && conversations.length > 0) {
      const firstConversation = conversations.find(conv => 
        conv.participants.includes(currentUser.id)
      );
      
      if (firstConversation) {
        const otherParticipantId = firstConversation.participants.find(
          id => id !== currentUser.id
        );
        
        if (otherParticipantId) {
          navigate(`/messages/${otherParticipantId}`);
        }
      }
    }
  }, [userId, currentUser, conversations, navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto pt-20 pb-6 px-4 h-screen">
        <div className="bg-card border border-border rounded-lg overflow-hidden h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 h-full">
            {/* Messages Sidebar */}
            <div className="md:col-span-4 lg:col-span-3 h-full">
              <MessagesSidebar />
            </div>
            
            {/* Chat Interface */}
            <div className="md:col-span-8 lg:col-span-9 h-full border-t md:border-t-0 md:border-l">
              {userId ? (
                <ChatInterface receiverId={userId} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the sidebar to start messaging.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
