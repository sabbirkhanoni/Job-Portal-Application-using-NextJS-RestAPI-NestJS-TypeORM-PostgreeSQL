'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import AxiosToastError from '@/utils/AxiosToastError';
import {getUserFromToken} from '@/utils/getUser';

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
  
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [adminId, setAdminId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get token from localStorage and decode user on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('jwtToken');
      
      if (!storedToken) {
        console.error('❌ No token found in localStorage');
        router.push('/login');
        return;
      }

      setToken(storedToken);

      // Immediately decode user without waiting for state update
      const user = getUserFromToken(storedToken);
      console.log('Decoded user:', user);
      
      if (!user) {
        console.error('Failed to decode token, redirecting to login');
        router.push('/login');
        return;
      }
      
      console.log('User role:', user.role);
      console.log('User ID:', user.id);
      
      if (!user.id) {
        console.error('User ID not found in token. Please login again to get a new token.');
        alert('Your session is outdated. Please login again.');
        router.push('/login');
        return;
      }
      
      if (user.role === 'employee' || user.role === 'jobseeker' || user.role === 'agency') {
        console.log('Setting employeeId to:', user.id);
        setEmployeeId(user.id);
      } else {
        console.error('Invalid role:', user.role);
        alert('Access denied. This page is for employees only.');
        router.push('/login');
      }
    }
  }, [router]);

  // Fetch admin user on component mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Find admin user
        const adminUser = response.data.data?.find((user: any) => user.role === 'admin');
        if (adminUser) {
          console.log('Admin found:', adminUser);
          setAdminId(adminUser.id);
        } else {
          console.error('No admin user found in database');
          // Fallback: try to use first user or ID 1
          setAdminId(1);
        }
      } catch (error) {
        console.error('Failed to fetch admin:', error);
        // Fallback to ID 1
        setAdminId(1);
      }
    };
    
    if (token) {
      fetchAdmin();
    }
  }, [token]);

  useEffect(() => {
    if (!employeeId || !adminId) return;
    
    console.log('Fetching messages for employeeId:', employeeId, 'adminId:', adminId);
    fetchMessages();
    
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!, {
      cluster: process.env.NEXT_PUBLIC_CLUSTER!,
    });

    const channel = pusher.subscribe(`chat-${employeeId}`);
    channel.bind('new-message', (data: Message) => {
      setMessages(prev => [...prev, data]);
      scrollToBottom();
    });

    return () => {
      pusher.unsubscribe(`chat-${employeeId}`);
    };
  }, [employeeId, adminId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!employeeId || !adminId || !token) {
      console.log('Cannot fetch messages: missing employeeId, adminId, or token');
      return;
    }
    
    console.log('Fetching messages between:', employeeId, 'and', adminId);
    
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/messages/${employeeId}/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log('Messages fetched:', response.data);
      setMessages(response.data.data);
      
      // Mark messages as read
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/mark-read`,
        { userId: employeeId, otherUserId: adminId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !employeeId || !adminId || !token) {
      console.log('Cannot send message: missing data', { newMessage: !!newMessage.trim(), employeeId, adminId, token: !!token });
      return;
    }

    console.log('Sending message from', employeeId, 'to', adminId);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/send`,
        {
          senderId: employeeId,
          receiverId: adminId,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Message sent successfully:', response.data);
      setNewMessage('');
      fetchMessages();
    } catch (error: any) {
      console.error('Send message error:', error.response?.data || error);
      AxiosToastError(error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Show loading only if employeeId or adminId is not set yet
  if (!employeeId || !adminId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading chat...</p>
          {!employeeId && <p className="text-sm text-gray-500 mt-2">Waiting for employee ID...</p>}
          {!adminId && <p className="text-sm text-gray-500 mt-2">Waiting for admin ID...</p>}
        </div>
      </div>
    );
  }

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
              onClick={() => router.push('/empDashboard')}
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
        <div className="container mx-auto px-6 py-6">
          {/* Chat Messages */}
          <div className="card bg-white shadow-lg">
            <div className="card-body p-0 flex flex-col" style={{ height: 'calc(100vh - 220px)' }}>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full relative">
                      <img src="https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff" alt="Admin" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Admin</h3>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === employeeId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[75%] ${msg.senderId === employeeId ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full">
                          <img src={msg.senderAvatar || 'https://ui-avatars.com/api/?name=' + msg.senderName} alt={msg.senderName} />
                        </div>
                      </div>
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            msg.senderId === employeeId
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-900 shadow-sm'
                          }`}
                        >
                          <p className="break-words">{msg.message}</p>
                        </div>
                        <p className={`text-xs text-slate-400 mt-1 px-1 ${msg.senderId === employeeId ? 'text-right' : 'text-left'}`}>
                          {formatTime(msg.timestamp)}
                          {msg.senderId === employeeId && (
                            <span className="ml-1">
                              {msg.read ? '✓✓' : '✓'}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[75%]">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full">
                          <img src="https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff" alt="Admin" />
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
          </div>
        </div>
      </div>
    </div>
  );
}