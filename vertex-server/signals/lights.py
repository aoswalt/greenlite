import threading
import time

global thread
thread = None

def start():
    """Start the lights thread.
    """
    global thread
    if thread: return

    thread = LightsThread()
    thread.start()

class LightsThread(threading.Thread):
    def run(self):
        self.active_pins = tuple()

        while True:
            print('active_pins', self.active_pins)
            time.sleep(1)

    def set_active_pins(self, active_pins):
        self.active_pins = active_pins
