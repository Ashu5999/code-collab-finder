
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const MessagesSidebar = () => {
  const { currentUser, conversations, messages, getUser } = useApp();
  const params = useParams();
  const { userId } = params;
  
  if (!currentUser) return null;
  
  // Get conversations for current user
  const userConversations = conversations.filter(
    conversation => conversation.participants.includes(currentUser.id)
  );
  
  // Get the last message for each conversation
  const conversationsWithLastMessage = userConversations.map(conversation => {
    const [participant1, participant2] = conversation.participants;
    const otherParticipantId = participant1 === currentUser.id ? participant2 : participant1;
    const otherParticipant = getUser(otherParticipantId);
    
    const conversationMessages = messages.filter(
      message => 
        (message.senderId === participant1 && message.receiverId === participant2) || 
        (message.senderId === participant2 && message.receiverId === participant1)
    ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    const lastMessage = conversationMessages[0];
    
    return {
      ...conversation,
      otherParticipant,
      lastMessage,
    };
  }).sort((a, b) => {
    if (!a.lastMessage) return 1;
    if (!b.lastMessage) return -1;
    return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime();
  });
  
  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search messages..."
            className="w-full pl-8 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversationsWithLastMessage.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No conversations yet</p>
              <Button asChild variant="link" className="mt-2">
                <Link to="/browse">Find teammates</Link>
              </Button>
            </div>
          ) : (
            conversationsWithLastMessage.map(conv => {
              if (!conv.otherParticipant) return null;
              
              const isActive = userId === conv.otherParticipant.id;
              
              return (
                <Link key={conv.id} to={`/messages/${conv.otherParticipant.id}`}>
                  <div 
                    className={`p-2 rounded-md flex items-center cursor-pointer transition-colors ${
                      isActive ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                  >
                    <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                      <AvatarImage src={conv.otherParticipant.avatar} alt={conv.otherParticipant.name} />
                      <AvatarFallback>
                        {conv.otherParticipant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium truncate">{conv.otherParticipant.name}</h4>
                        {conv.lastMessage && (
                          <span className="text-xs text-muted-foreground">
                            {format(conv.lastMessage.timestamp, 'MMM d')}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        {conv.lastMessage ? (
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                            {conv.lastMessage.content}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No messages yet
                          </p>
                        )}
                        
                        {conv.unreadCount > 0 && conv.lastMessage?.senderId !== currentUser.id && (
                          <Badge variant="default" className="ml-2 text-xs">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessagesSidebar;
