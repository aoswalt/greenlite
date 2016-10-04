import os
import sqlite3
import time

file_path = os.path.dirname(__file__)
db_path = os.path.join(file_path, '../db.sqlite3')

device_labels = []
devices = {label:{
    'label': label,
    'address': '',
    'last_seen': 0,
    } for label in device_labels}

def greet_device(device_label, address):
    if device_label not in device_labels:
        print('WARN: Adding new device - {}'.format(device_label))
        device_labels.append(device_label)
        devices[device_label] = {'label':device_label, 'address':'', 'last_seen':0}
    elif devices[device_label]['address'] != address:
        print('WARN: Changing device label to {} @ {}'.format(device_label, address))
        devices[device_label]['address'] = address


    with sqlite3.connect(db_path) as conn:
        c = conn.cursor()
        # update or insert if doesn't exist
        c.execute('UPDATE scheduler_vertex SET address=?, enabled=1, last_seen=? WHERE label=?',
                  (address, time.time(), device_label))
        if c.rowcount == 0:
            c.execute('INSERT INTO scheduler_vertex(address, enabled, last_seen) '
                      'VALUES(?, 1, ?)',
                      (address, time.time()))

    devices[device_label]['address'] = address
    devices[device_label]['last_seen'] = time.time()

def get_missing_devices(past_time):
    return [d for d in devices if d['last_seen'] < past_time]
