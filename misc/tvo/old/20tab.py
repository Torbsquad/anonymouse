import mouse
import time
import keyboard

def idle(x, text=""):
    for i in range(x):
        print(text + str(x-i))
        time.sleep(1)

idle(2, "starting in ")
for i in range(20):
    print("iteration "+str(i+1))
    mouse.click('left')
    time.sleep(.1)
    keyboard.send("ctrl+v")
    keyboard.send("enter")
    time.sleep(.1)