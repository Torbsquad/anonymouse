import mouse
import time
import keyboard

def idle(x, text=""):
    for i in range(x):
        print(text + str(x-i))
        time.sleep(1)

idle(2, "starting in ")
while True:
    keyboard.send("ctrl+tab")
    time.sleep(2)