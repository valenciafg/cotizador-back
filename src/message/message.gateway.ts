import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const WS_PORT = parseInt(process.env.SOCKET_PORT);

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(MessageGateway.name);
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    this.logger.log('Inicio del servidor de socket');
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log('alguien se conecto al socket');
  }

  handleDisconnect(client: any) {
    console.log({ client });
    this.logger.log('alguien se desconecto');
  }

  @SubscribeMessage('event_message')
  handleIncommingMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    const { room, message } = payload;
    const id = `room_${room}`;
    // console.log({ client });
    console.log({ payload });
    this.server.to(id).emit('new_message', message);
  }
  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    const id = `room_${room}`;
    console.log(`alguien se conectó a ${id}`);
    client.join(id);
  }
  @SubscribeMessage('event_leave')
  handleLeaveRoom(client: Socket, room: string) {
    const id = `room_${room}`;
    console.log(`alguien se desconectó a ${id}`);
    client.leave(id);
  }
}
