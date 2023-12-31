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
      const { name, token } = socket.handshake.auth;
      if (!name || !token) {
        socket.disconnect();
      }
      console.log(`socket connected: ${name} ${token} ${socket.id}`);

      // Add client to the connected clients list
      this.chatService.onClientConnected({
        id: socket.id,
        name,
      });

      // Send list of connected clients to the new client
      this.server.emit('clients', this.chatService.getClients());
      
      // Client disconnected
      socket.on('disconnect', () => {
        console.log('socket disconnected');
        this.chatService.onClientDisconnected(socket.id);

        // Send list of connected clients to the new client
        this.server.emit('clients', this.chatService.getClients());
      });
    });
  }
}
