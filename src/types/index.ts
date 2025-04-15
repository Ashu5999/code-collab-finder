
export type User = {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  hackathons: string[];
  bio: string;
  avatar: string;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
};

export type Conversation = {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
};
