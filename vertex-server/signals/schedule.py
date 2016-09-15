import operator
import threading
import time

from .config import *
from . import test

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
    thread.add_event(test.entry)

class ScheduleThread(threading.Thread):
    def run(self):
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
                index = int(self.current_time - entry['startTime'] / 1000) % len(entry['signals'])
            else:
                index = int(self.current_time / 1000) % len(entry['signals'])

            self.set_lights(entry['signals'][index])

            self.current_time = time.time()
            time.sleep(1)

    def add_event(self, event, allow_overwrite=False):
        if not 'priority' in event:
            print('ERROR: No priority for event:\n{}'.format(event))
            return 1

        # get existing event with same priority if exists
        existing = next((e for e in self.events if e['priority'] == event['priority']), None)
        if existing:
            if allow_overwrite:
                print('WARN: Overwriting event with priority {}'.format(existing['priority']))
                self.events.remove(existing)
            else:
                print('ERROR: Entry already exists for priority {}'.format(existing['priority']))
                return 1

        self.events.append(event)
        self.sort_events()

    def sort_events(self):
        self.events.sort(key=operator.itemgetter('priority'), reverse=True)

    def set_lights(self, signal):
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
        print('Set lights to \n{}'.format(signal))
