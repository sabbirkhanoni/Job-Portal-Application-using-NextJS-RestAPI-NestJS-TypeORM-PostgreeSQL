import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService } from '../Services/pusher.service';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(
    @Body() body: { senderId: number; receiverId: number; message: string }
  ) {
    const message = await this.chatService.sendMessage(
      body.senderId,
      body.receiverId,
      body.message
    );
    return {
      success: true,
      message: 'Message sent successfully',
      data: message,
    };
  }

  @Get('conversations/:userId')
  async getConversations(@Param('userId') userId: number) {
    const conversations = await this.chatService.getConversations(userId);
    return {
      success: true,
      data: conversations,
    };
  }

  @Get('messages/:userId/:otherUserId')
  async getMessages(
    @Param('userId') userId: number,
    @Param('otherUserId') otherUserId: number
  ) {
    const messages = await this.chatService.getMessages(userId, otherUserId);
    return {
      success: true,
      data: messages,
    };
  }

  @Post('mark-read')
  async markAsRead(
    @Body() body: { userId: number; otherUserId: number }
  ) {
    await this.chatService.markAsRead(body.userId, body.otherUserId);
    return {
      success: true,
      message: 'Messages marked as read',
    };
  }
}