import requests
import signals
import socket
import time
import threading

def get_network_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return 'http://{}/'.format(s.getsockname()[0])

view_path = 'vertex/'
headers = {
    'label': signals.config.intersection_label,
    'address': get_network_ip(),
}
server_aware = False

thread = None

def start():
    global thread
    if thread: return

    thread = HeartbeatThread()
    thread.start()

class HeartbeatThread(threading.Thread):

    def run(self):
        global server_aware

        while True:
            server_aware = False
            while not server_aware:
                try:
                    r = requests.get(signals.config.central_server_address + view_path, headers=headers)
                    if r.status_code == 200:
                        server_aware = True
                except requests.exceptions.ConnectionError:
                    print('trying to reach server')
                time.sleep(1)

            print('mini thump')
            time.sleep(5)
