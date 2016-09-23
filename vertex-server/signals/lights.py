import os
import threading
import time
from gpiozero import LED

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
    """Thread subclass for manipulating the LED gpio pins.
    """

    def run(self):
        """The entry point of a thread.start()
        """
        self.pins = [LED(i) for i in range(28)]
        self.active_pin_pairs = (tuple(),)
        self.last_pair = tuple()
        self.delay = 0.001

        while True:
            self.cycle_active_pins()
            time.sleep(self.delay)

    def cycle_active_pins(self):
        """Cycle the LED pins for the active pin pairs
        """
        for pair in self.active_pin_pairs:
            # print('pair', pair)
            if self.last_pair:
                for pin in pair:
                    self.pins[pin].off()
            for pin in pair:
                self.pins[pin].on()
            self.last_pair = pair
            time.sleep(self.delay)

def set_active_pin_pairs(active_pin_pairs):
    """External function to set the active pin pairs

    Arguments:
        active_pin_pairs    the new group of active pin pairs
    """
    if not thread:
        print('WARN: lights thread not found')
        return 1

    thread.active_pin_pairs = active_pin_pairs
