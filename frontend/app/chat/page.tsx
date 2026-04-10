'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { useCookie } from 'next-cookie';
import AxiosToastError from '@/utils/AxiosToastError';
import {getUserFromToken} from '@/utils/getUser';
import { string } from 'zod';

// Type definitions
type Message = {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  receiverId: number;
  message: string;
  timestamp: string;
  read: boolean;
}

type Conversation = {
  userId: number;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function ChatPage() {
  const router = useRouter();
  const cookies = useCookie();
  
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [adminId, setAdminId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token: string | undefined = cookies.get('jwtToken');

  useEffect(() => {
  const user = getUserFromToken(token);

    if (user && user.role === 'admin') {
      setAdminId(user.id);
    } else {
      router.push('/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (!adminId) return;
    
    fetchConversations();
    
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!, {
      cluster: process.env.NEXT_PUBLIC_CLUSTER!,
    });

    const channel = pusher.subscribe(`chat-${adminId}`);
    channel.bind('new-message', (data: Message) => {
      setMessages(prev => [...prev, data]);
      fetchConversations(); // Update conversation list
      scrollToBottom();
    });

    return () => {
      pusher.unsubscribe(`chat-${adminId}`);
    };
  }, [adminId]);




  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    if (!adminId) return;
    
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/conversations/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversations(response.data.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchMessages = async (otherUserId: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/messages/${adminId}/${otherUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.data);
      
      // Mark messages as read
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/mark-read`,
        { userId: adminId, otherUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      fetchConversations(); // Update unread count
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.userId);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/send`,
        {
          senderId: adminId,
          receiverId: selectedConversation.userId,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewMessage('');
      fetchMessages(selectedConversation.userId);
      fetchConversations();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 h-[80vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white flex-shrink-0">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold mb-1">Messages</h1>
            </div>
            
            <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-900 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 4l-4-4 4-4" />
              </svg>
              Back
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Conversations List - Left Side - SCROLLABLE */}
          <div className="lg:col-span-4">
            <div className="card bg-white shadow-lg">
              <div className="card-body p-0">
                {/* Search */}
                <div className="p-4 border-b sticky top-0 bg-white z-10">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Conversations List */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.userId}
                      onClick={() => handleSelectConversation(conv)}
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-all border-b ${
                        selectedConversation?.userId === conv.userId
                          ? 'bg-blue-200 border-l-4 border-l-blue-600'
                          : ''
                      }
                      ${
                        conv.unreadCount > 0 ? 'bg-gray-200 border-l-4 border-l-blue-600' : ''
                      }
                      `}
                    >
                      <div className="avatar relative ">
                        <div className="relative overflow-visible">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                                src={conv.userAvatar || 'https://ui-avatars.com/api/?name=' + conv.userName}
                                alt={conv.userName}
                                className="w-full h-full object-cover"
                            />
                            </div>
                        </div>
                        </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-slate-900">{conv.userName}</h3>
                          {conv.unreadCount > 0 && (
                            <span className="badge badge-primary badge-sm">{conv.unreadCount}</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-slate-400 mt-1">{formatTime(conv.lastMessageTime)}</p>
                      </div>
                    </div>
                  ))}

                  {filteredConversations.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-2">💬</div>
                      <p className="text-slate-500">No conversations found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-8">
            <div className="card bg-white shadow-lg sticky top-6">
              {selectedConversation ? (
                <div className="card-body p-0 flex flex-col" style={{ height: 'calc(100vh - 220px)' }}>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-4 border-b bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full relative">
                          <img src={selectedConversation.userAvatar || 'https://ui-avatars.com/api/?name=' + selectedConversation.userName} alt={selectedConversation.userName} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{selectedConversation.userName}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === adminId ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-2 max-w-[75%] ${msg.senderId === adminId ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
                              <img src={msg.senderAvatar || 'https://ui-avatars.com/api/?name=' + msg.senderName} alt={msg.senderName} />
                            </div>
                          </div>
                          <div>
                            <div
                              className={`rounded-2xl px-4 py-2 ${
                                msg.senderId === adminId
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-slate-900 shadow-sm'
                              }`}
                            >
                              <p className="break-words">{msg.message}</p>
                            </div>
                            <p className={`text-xs text-slate-400 mt-1 px-1 ${msg.senderId === adminId ? 'text-right' : 'text-left'}`}>
                              {formatTime(msg.timestamp)}
                              {msg.senderId === adminId && (
                                <span className="ml-1">
                                  {msg.read ? '✓✓' : '✓'}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="input input-bordered flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 220px)' }}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Select a Conversation</h3>
                    <p className="text-slate-600">Choose a conversation from the list to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}