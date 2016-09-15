from time import time

entry = {
    'priority': 5,
    'startTime': time(),
    'endTime': time() + 6000, 
    'repeat': True,
    'signals': [
        {
            'roadA': {'L':0, 'S':2, 'R':0},
            'roadB': {'L':0, 'S':0, 'R':0},
        },
        {
            'roadA': {'L':2, 'S':1, 'R':0},
            'roadB': {'L':0, 'S':2, 'R':0},
        },
    ]
}
