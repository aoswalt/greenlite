import time

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

    devices[device_label]['address'] = address
    devices[device_label]['last_seen'] = time.time()

def get_missing_devices(past_time):
    return [d for d in devices if d['last_seen'] < past_time]
