import requests
import signals
import time
import threading

view_path = 'vertex/'
headers = {
    'label': signals.config.intersection_label,
    'address': 'http://localhost:8001'
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
