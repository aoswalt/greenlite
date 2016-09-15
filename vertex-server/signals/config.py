# light pin definitions
light_pins = {
  'a1r': (1, 1),
  'a1y': (1, 2),
  'a1g': (1, 3),
  'a1gl': (1, 6),
  'a2r': (3, 1),
  'a2y': (3, 2),
  'a2g': (3, 3),
  'b1r': (2, 1),
  'b1y': (2, 2),
  'b1g': (2, 3),
}

# map lights keys to directions
mapping_labels = {
    'roadA': {
        'L': (
            ('',),
            ('',),
            ('a1gl',),
        ),
        'S': (
            ('a1r', 'a2r',),
            ('a1y', 'a2y',),
            ('a1g', 'a2g',),
        ),
    },
    'roadB': {
        'S': (
            ('b1r',),
            ('b1y',),
            ('b1g',),
        ),
    }
}

# fallback pattern
disabled_pattern = {
    'signals': [
        {
            'roadA': {},
            'roadB': {'L':0, 'S':0, 'R':0},
        },
        {
            'roadA': {'L':0, 'S':0, 'R':0},
            'roadB': {},
        },
    ]
}
