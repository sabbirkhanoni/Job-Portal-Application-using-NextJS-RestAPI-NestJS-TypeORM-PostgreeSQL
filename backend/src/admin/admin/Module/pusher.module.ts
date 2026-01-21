import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from '../Controller/pusher.controller';
import { ChatService } from '../Services/pusher.service';
import { ChatMessage } from '../Entity/PusherChat.entity';
import { RegistrationDetailsEntity } from '../Auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, RegistrationDetailsEntity])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}