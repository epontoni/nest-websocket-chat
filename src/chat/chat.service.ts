import { Injectable } from '@nestjs/common';

interface Client {
    id: string;
    name: string;
}

@Injectable()
export class ChatService {
  /* This is a map of client IDs to client objects.
   * The client object contains the client's name and ID.
   * We'll use the client ID to send messages to specific clients.
   * We'll use the client name to display the client's name in the chat UI.
   * {
   *  'client-id-1': { id: 'client-id-1', name: 'John' },
   *  'client-id-2': { id: 'client-id-2', name: 'Doe' },
   * }
   */
  private clients: Record<string, Client> = {};

  onClientConnected(client: Client) {
    this.clients[client.id] = client;
  }

  onClientDisconnected(id: string) {
    delete this.clients[id];
  }

  getClients() {
    return Object.values(this.clients);
  }
}
