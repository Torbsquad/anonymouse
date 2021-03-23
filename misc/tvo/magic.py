import mouse
import time

clicks = [(222,419),(151,545),(222,419),(152,499),(580,876)]
for i in range(5):
    print("iteration "+str(i+1))
    for click in clicks:
        mouse.move(click[0], click[1], absolute=True, duration=0.1)
        mouse.click('left')
        time.sleep(1)
    time.sleep(5)