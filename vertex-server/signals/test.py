from time import time

entry = {
    'priority': 5,
    'startTime': time(),
    'endTime': time() + 6,
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

'''
{
    "priority": 7,
    "start_time": 1474470858,
    "end_time": 14744708580,
    "expire_time": 14744708580,
    "repeat": true,
    "signals": [
        {
            "roadA": {"L":0, "S":0, "R":2},
            "roadB": {"L":0, "S":0, "R":2}
        },
        {
            "roadA": {"L":2, "S":0, "R":2},
            "roadB": {"L":0, "S":0, "R":2}
        }
    ]
}
'''

'''
[ { 'roadA': {'L':0, 'S':2, 'R':0}, 'roadB': {'L':0, 'S':0, 'R':0}, }, { 'roadA': {'L':2, 'S':1, 'R':0}, 'roadB': {'L':0, 'S':2, 'R':0}, }, ]
'''
