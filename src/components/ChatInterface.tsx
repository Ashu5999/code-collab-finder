
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/context/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { Send } from 'lucide-react';

interface ChatInterfaceProps {
  receiverId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ receiverId }) => {
  const { currentUser, getConversation, getMessagesForConversation, sendMessage, getUser } = useApp();
  const [messageText, setMessageText] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const receiver = getUser(receiverId);
  const conversation = currentUser ? getConversation(currentUser.id, receiverId) : undefined;
  const messages = conversation ? getMessagesForConversation(conversation.id) : [];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !currentUser) return;
    
    sendMessage(currentUser.id, receiverId, messageText);
    setMessageText('');
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  if (!receiver || !currentUser) {
    return <div className="p-4 text-center">User not found</div>;
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="px-4 py-3 border-b flex items-center">
        <Avatar className="h-9 w-9 mr-2">
          <AvatarImage src={receiver.avatar} alt={receiver.name} />
          <AvatarFallback>{receiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{receiver.name}</h3>
          <p className="text-xs text-muted-foreground">{receiver.title}</p>
        </div>
      </div>
      
      {/* Messages area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const sender = getUser(message.senderId);
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex max-w-[80%]">
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage src={sender?.avatar} alt={sender?.name} />
                        <AvatarFallback>
                          {sender?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <div 
                        className={`rounded-lg p-3 ${
                          isCurrentUser 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {message.content}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex">
        <Input 
          placeholder="Type a message..." 
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" className="ml-2" disabled={!messageText.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
