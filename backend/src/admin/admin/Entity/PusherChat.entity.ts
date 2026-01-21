import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { RegistrationDetailsEntity } from '../Auth/auth.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RegistrationDetailsEntity)
  sender: RegistrationDetailsEntity;

  @Column()
  senderId: number;

  @ManyToOne(() => RegistrationDetailsEntity)
  receiver: RegistrationDetailsEntity;

  @Column()
  receiverId: number;

  @Column('text')
  message: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  timestamp: Date;
}