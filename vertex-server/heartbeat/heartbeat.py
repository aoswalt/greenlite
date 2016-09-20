import requests
import signals

view_path = 'vertex/'
headers = {
    'label': signals.config.intersection_label,
    'address': 'http://localhost:8001'
}

def start():
    print('would be starting heartbeat')

    r = requests.get(signals.config.central_server_address + view_path, headers=headers)
    print(r.text)
