import operator
import threading
import time

from .config import *
from . import lights, test

global thread
thread = None

def start():
    """Start the schedule thread.
    """
    global thread
    if thread: return

    thread = ScheduleThread()
    thread.start()

    time.sleep(2)
    add_event(test.entry)

class ScheduleThread(threading.Thread):
    """Thread subclass for manipulating the working with the event list.
    """

    def run(self):
        """The entry point of a thread.start()
        """
        # dictionary to hold bulb lit status
        self.light_status = {k: {'lit':False} for k in light_pins}

        # generate mapping from mapping_labels
        self.mapping = {
            road: {
                direction: [
                    [self.light_status[label] if label else {} for label in label_list]
                    for label_list in mapping_labels[road][direction]
                ] for direction in mapping_labels[road]
            } for road in mapping_labels
        }

        self.events = []

        self.current_time = time.time()
        while True:
            entry = disabled_pattern
            for e in self.events:
                if 'startTime' in e and self.current_time < e['startTime']:
                    continue

                if 'endTime' in e and e['endTime'] < self.current_time:
                    continue

                entry = e
                break

            if 'startTime' in entry:
                index = int(self.current_time - entry['startTime']) % len(entry['signals'])
            else:
                index = int(self.current_time) % len(entry['signals'])

            self.set_lights(entry['signals'][index])
            self.push_to_lights_thread()

            self.current_time = time.time()
            time.sleep(1)

    def sort_events(self):
        """Sort events in descending priority
        """
        self.events.sort(key=operator.itemgetter('priority'), reverse=True)

    def set_lights(self, signal):
        """Update the lights based on the given signal

        Arguments:
            signal      the current signal to be active
        """
        for road in self.mapping:
            for direction in self.mapping[road]:
                for map_dir in self.mapping[road][direction]:
                    for light in map_dir:
                        light['lit'] = False

                for signal_dir in signal[road]:
                    if signal_dir in self.mapping[road]:
                        map_dir = self.mapping[road][signal_dir]
                        signal_num = signal[road][signal_dir]

                        for light in map_dir[signal_num]:
                            light['lit'] = True

    def push_to_lights_thread(self):
        """Push the appropriate LED pins to the lights thread from the active lights.
        """
        active_pin_pairs = self.get_active_pin_pairs_from_light_status()
        lights.set_active_pin_pairs(active_pin_pairs)

    def get_active_pin_pairs_from_light_status(self):
        """Get the pairs of pins that should be active for each lit light.
        """
        active_pin_pairs = [
            light_pins[light]
            for light in self.light_status
            if self.light_status[light]['lit']]
        return active_pin_pairs

def add_event(event, allow_overwrite=False):
    """Add a new event to the schedule.

    Arguments:
        event               the new event to be added
        allow_overwrite     is overwriting an existing priority allowed
                            Default = False
    """
    if not thread:
        print('WARN: schedule thread not found')
        return 1

    if not 'priority' in event:
        print('ERROR: No priority for event:\n{}'.format(event))
        return 1

    # get existing event with same priority if exists
    existing = next((e for e in thread.events if e['priority'] == event['priority']), None)
    if existing:
        if allow_overwrite:
            print('WARN: Overwriting event with priority {}'.format(existing['priority']))
            thread.events.remove(existing)
        else:
            print('ERROR: Entry already exists for priority {}'.format(existing['priority']))
            return 1

    thread.events.append(event)
    thread.sort_events()

    print('thread.events', thread.events)
