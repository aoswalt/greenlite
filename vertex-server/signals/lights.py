import os
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
    """Thread subclass for manipulating the LED gpio pins.
    """

    def run(self):
        """The entry point of a thread.start()
        """
        self.active_pin_pairs = (tuple(),)
        self.last_pair = tuple()
        self.delay = 0.01

        while True:
            self.cycle_active_pins()
            time.sleep(self.delay * 100)

    def set_active_pin_pairs(self, active_pin_pairs):
        """External function to set the active pin pairs

        Arguments:
            active_pin_pairs    the new group of active pin pairs
        """
        self.active_pin_pairs = active_pin_pairs

    def cycle_active_pins(self):
        """Cycle the LED pins for the active pin pairs
        """
        # os.system('cls')  # for Windows
        os.system('clear')  # for Linux/OS X

        if self.active_pin_pairs[0]:
            pins0 = [p[0] for p in self.active_pin_pairs]
            pins1 = [p[1] for p in self.active_pin_pairs]
            print(''.join([('*' if i in pins0 else '_') for i in range(1, 9)]))
            print(''.join([('*' if i in pins1 else '_') for i in range(1, 9)]))
        for pair in self.active_pin_pairs:
            if self.last_pair:
                print('LED({}).off() LED({}).off()'.format(self.last_pair[0], self.last_pair[1]))
            if self.active_pin_pairs[0]:
                print('LED({}).on()  LED({}).on()'.format(pair[0], pair[1]))
            # self.last_pair[0].off()
            # self.last_pair[1].off()
            # pair[0].on()
            # pair[1].on()
            self.last_pair = pair
            time.sleep(self.delay)
