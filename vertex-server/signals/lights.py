import threading
import time

global thread
thread = None

def start():
    """Start the lights thread.
    """
    global thread
    if thread: return

    thread = threading.Thread(target=test_run)
    thread.start()

def test_run():
    print('Lights thread started.')
    print('Lights: Zzz')
    time.sleep(3)
    print('Lights: Done!')
