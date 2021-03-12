import asyncio
import socketio
import time

sio = socketio.AsyncClient()


@sio.event
async def connect():
    print('connected to server')
    await send_ping()


@sio.event
async def disconnect():
    print('disconnected from server')


@sio.event
async def send_ping():
    await sio.emit('join')


async def start_server():
    await sio.connect('http://localhost:3000')
    await sio.wait()


if __name__ == '__main__':
    asyncio.run(start_server())
