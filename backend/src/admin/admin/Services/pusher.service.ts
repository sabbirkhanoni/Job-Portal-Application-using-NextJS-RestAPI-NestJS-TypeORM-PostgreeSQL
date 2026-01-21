import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from '../Entity/PusherChat.entity';
import { RegistrationDetailsEntity } from '../Auth/auth.entity';
import Pusher from 'pusher';

@Injectable()
export class ChatService {
  private pusher: Pusher;

  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepo: Repository<ChatMessage>,
    @InjectRepository(RegistrationDetailsEntity)
    private readonly userRepo: Repository<RegistrationDetailsEntity>,
  ) {

    const appId = process.env.PUSHER_APP_ID;
    const key = process.env.PUSHER_PUBLISHABLE_KEY;
    const secret = process.env.PUSHER_SECRET_KEY;
    const cluster = process.env.PUSHER_CLUSTER;

    if (!appId || !key || !secret || !cluster) {
      throw new Error('Missing Pusher configuration. Please check your .env file.');
    }

    this.pusher = new Pusher({
      appId,
      key,
      secret,
      cluster,
      useTLS: true,
    });
  }

  async sendMessage(senderId: number, receiverId: number, message: string): Promise<any> {
    try {
      const sender = await this.userRepo.findOne({ where: { id: senderId } });
      const receiver = await this.userRepo.findOne({ where: { id: receiverId } });

      if (!sender || !receiver) {
        throw new BadRequestException('Sender or receiver not found');
      }

      const chatMessage = this.chatRepo.create({
        senderId,
        receiverId,
        message,
        sender,
        receiver,
        read: false,
      });

      const savedMessage = await this.chatRepo.save(chatMessage);

      // Trigger Pusher event
      await this.pusher.trigger(`chat-${receiverId}`, 'new-message', {
        id: savedMessage.id,
        senderId: savedMessage.senderId,
        senderName: sender.fullName,
        senderAvatar: sender.avatar,
        receiverId: savedMessage.receiverId,
        message: savedMessage.message,
        timestamp: savedMessage.timestamp,
        read: savedMessage.read,
      });

      return savedMessage;
    } catch (error) {
      throw new BadRequestException('Failed to send message: ' + error.message);
    }
  }

  async getConversations(userId: number): Promise<any> {
    try {
      const messages = await this.chatRepo
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.sender', 'sender')
        .leftJoinAndSelect('message.receiver', 'receiver')
        .where('message.senderId = :userId OR message.receiverId = :userId', { userId })
        .orderBy('message.timestamp', 'DESC')
        .getMany();

      const conversationsMap = new Map();

      messages.forEach((msg) => {
        const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
        
        if (!conversationsMap.has(otherUserId)) {
          const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;
          conversationsMap.set(otherUserId, {
            userId: otherUserId,
            userName: otherUser.fullName,
            userAvatar: otherUser.avatar,
            lastMessage: msg.message,
            lastMessageTime: msg.timestamp,
            unreadCount: 0,
          });
        }

        if (msg.receiverId === userId && !msg.read) {
          conversationsMap.get(otherUserId).unreadCount++;
        }
      });

      return Array.from(conversationsMap.values());
    } catch (error) {
      throw new BadRequestException('Failed to get conversations: ' + error.message);
    }
  }

  async getMessages(userId: number, otherUserId: number): Promise<any> {
    try {
      const messages = await this.chatRepo
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.sender', 'sender')
        .where(
          '(message.senderId = :userId AND message.receiverId = :otherUserId) OR (message.senderId = :otherUserId AND message.receiverId = :userId)',
          { userId, otherUserId }
        )
        .orderBy('message.timestamp', 'ASC')
        .getMany();

      return messages.map(msg => ({
        id: msg.id,
        senderId: msg.senderId,
        senderName: msg.sender.fullName,
        senderAvatar: msg.sender.avatar,
        receiverId: msg.receiverId,
        message: msg.message,
        timestamp: msg.timestamp,
        read: msg.read,
      }));
    } catch (error) {
      throw new BadRequestException('Failed to get messages: ' + error.message);
    }
  }

  async markAsRead(userId: number, otherUserId: number): Promise<any> {
    try {
      await this.chatRepo
        .createQueryBuilder()
        .update(ChatMessage)
        .set({ read: true })
        .where('senderId = :otherUserId AND receiverId = :userId AND read = false', {
          userId,
          otherUserId,
        })
        .execute();

      return { success: true };
    } catch (error) {
      throw new BadRequestException('Failed to mark messages as read: ' + error.message);
    }
  }
}