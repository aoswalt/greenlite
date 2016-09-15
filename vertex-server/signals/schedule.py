import threading
import time

from .config import *

global thread
thread = None

def start():
    """Start the schedule thread.
    """
    global thread
    if thread: return

    thread = ScheduleThread()
    thread.start()

class ScheduleThread(threading.Thread):
    def run(self):
        self.events = []

        while True:
            print('events', self.events)
            time.sleep(1)

    def add_event(self, event, overwrite=False):
        self.events.append(event)
