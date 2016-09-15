from datetime import datetime, timedelta

entry = {
    'priority': 5,
    'startTime': datetime.now(),
    'endTime': datetime.now() + timedelta(seconds=6),
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
