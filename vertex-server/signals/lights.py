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
        self.active_pin_pairs = (tuple(),)

        while True:
            print('active_pins', self.active_pin_pairs)
            time.sleep(1)

    def set_active_pin_pairs(self, active_pin_pairs):
        self.active_pin_pairs = active_pin_pairs

    def cycle_active_pins(self):
        for pairs in self.active_pin_pairs:
            pass
