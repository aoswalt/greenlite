import os
import requests
import sqlite3
import threading
import time

from . import mapping

thread = None

file_path = os.path.dirname(__file__)
db_path = os.path.join(file_path, '../db.sqlite3')

def start():
    global thread
    if thread: return

    thread = HeartbeatThread()
    thread.start()

class HeartbeatThread(threading.Thread):

    def run(self):
        self.beat_time = 5

        while True:
            print('thump')
            for label in mapping.device_labels:
                self.ping_device(mapping.devices[label])
            time.sleep(self.beat_time)

    def ping_device(self, device):
        try:
            r = requests.get(device['address'])
            if r.status_code == 200:
                device['last_seen'] = time.time()

                # cannot use django models because of import timing
                with sqlite3.connect(db_path) as conn:
                    c = conn.cursor()
                    c.execute('UPDATE scheduler_vertex SET address=?,last_seen=? WHERE label=?',
                              (device['address'], time.time(), device['label']))
            print(r.text)
        except (requests.exceptions.ConnectionError):
            print('ERROR: Could not connect to {} @ {}'.format(device['label'], device['address']))
