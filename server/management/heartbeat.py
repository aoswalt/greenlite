import requests
import threading
import time

from . import mapping

thread = None

def start():
    global thread
    if thread: return

    thread = HeartBeatThread()
    thread.start()

class HeartBeatThread(threading.Thread):

    def run(self):
        self.beat_time = 5

        while True:
            print('thump')
            for label in mapping.device_labels:
                self.ping_device(mapping.devices[label])
            time.sleep(self.beat_time)

    def ping_device(self, device):
        r = requests.get(device['address'])
        if r.status_code == 200:
            device['last_seen'] = time.time()
        print(r.text)
