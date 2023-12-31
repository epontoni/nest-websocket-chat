import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) {}
  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // New client connected
      console.log('socket connected');
      
      // Client disconnected
      socket.on('disconnect', () => {
        console.log('socket disconnected');
      });
    });
  }
}
