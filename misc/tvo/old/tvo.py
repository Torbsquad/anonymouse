import keyboard
import time

def idle(x, text=""):
    for i in range(x):
        print(text + str(x-i))
        time.sleep(1)

idle(2, "starting in ")
for i in range(50):
    keyboard.send("ctrl+shift+n")
    time.sleep(1)
    #keyboard.send("ctrl+v")
    keyboard.write("https://trovo.live/Wumbo?adtag=user.VonFriedricht.clip")
    keyboard.send("enter")
    time.sleep(8)
    keyboard.send("ctrl+w")
    time.sleep(1)
