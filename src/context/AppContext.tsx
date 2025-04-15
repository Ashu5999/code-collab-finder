
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Message, Conversation } from '@/types';
import { users as mockUsers, conversations as mockConversations, messages as mockMessages } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AppContextType {
  users: User[];
  currentUser: User | null;
  conversations: Conversation[];
  messages: Message[];
  setCurrentUser: (user: User | null) => void;
  filteredUsers: User[];
  setFilteredUsers: (users: User[]) => void;
  filters: {
    skills: string[];
    locations: string[];
    hackathons: string[];
    search: string;
  };
  setFilters: (filters: {
    skills: string[];
    locations: string[];
    hackathons: string[];
    search: string;
  }) => void;
  getConversation: (userId1: string, userId2: string) => Conversation | undefined;
  getMessagesForConversation: (conversationId: string) => Message[];
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
  getUser: (userId: string) => User | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [filters, setFilters] = useState({
    skills: [] as string[],
    locations: [] as string[],
    hackathons: [] as string[],
    search: '',
  });
  const { toast } = useToast();

  // Set default current user for demo purposes
  useEffect(() => {
    if (!currentUser && users.length > 0) {
      setCurrentUser(users[0]);
    }
  }, [users, currentUser]);

  const getConversation = (userId1: string, userId2: string): Conversation | undefined => {
    return conversations.find(c => 
      c.participants.includes(userId1) && c.participants.includes(userId2)
    );
  };

  const getMessagesForConversation = (conversationId: string): Message[] => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return [];
    
    const [user1, user2] = conversation.participants;
    return messages.filter(
      m => (m.senderId === user1 && m.receiverId === user2) || 
           (m.senderId === user2 && m.receiverId === user1)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getUser = (userId: string): User | undefined => {
    return users.find(u => u.id === userId);
  };

  const sendMessage = (senderId: string, receiverId: string, content: string) => {
    // Create a new message
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      senderId,
      receiverId,
      content,
      timestamp: new Date(),
      read: false,
    };
    
    // Add message to messages
    setMessages(prev => [...prev, newMessage]);
    
    // Check if conversation exists
    let conversation = getConversation(senderId, receiverId);
    
    if (conversation) {
      // Update existing conversation
      setConversations(prev => 
        prev.map(c => 
          c.id === conversation?.id 
            ? { ...c, unreadCount: c.unreadCount + 1 } 
            : c
        )
      );
    } else {
      // Create new conversation
      const newConversation: Conversation = {
        id: `c${conversations.length + 1}`,
        participants: [senderId, receiverId],
        unreadCount: 1,
      };
      
      setConversations(prev => [...prev, newConversation]);
    }
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };

  return (
    <AppContext.Provider value={{ 
      users, 
      currentUser, 
      setCurrentUser,
      conversations, 
      messages,
      filteredUsers,
      setFilteredUsers,
      filters,
      setFilters,
      getConversation,
      getMessagesForConversation,
      sendMessage,
      getUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
