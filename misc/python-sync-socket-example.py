import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('connection established')
    sio.start_background_task(send_ping)

@sio.event
def disconnect():
    print('disconnected from server')

def send_ping():
    while True:
        sio.emit('join', {'temp':75})
        sio.sleep(5)

sio.connect('http://vnft.cc')