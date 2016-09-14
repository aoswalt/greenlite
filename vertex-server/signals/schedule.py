import threading
import time

global thread
thread = None

def start():
    """Start the schedule thread.
    """
    global thread
    if thread: return

    thread = threading.Thread(target=test_run)
    thread.start()

def test_run():
    print('Schedule thread started.')
    print('Schedule: Zzz')
    time.sleep(4)
    print('Schedule: Done!')
