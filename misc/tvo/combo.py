import mouse
import time
import keyboard

links = [
   "pepegawitch",
   "Ultrigeon",
   "Wumbo",
   "VonFriedricht",
   "Dooty",
   "Xnsy",
   "Darost",
   "Wynaut",
   "Wynaut",
]

def idle(x, text=""):
    for i in range(x):
        print(text + str(x-i))
        time.sleep(1)

idle(2, "starting in ")
for i in range(50):
    print("iteration "+str(i+1))
    for target in links:
        link = "https://trovo.live/wumbo?adtag=user."+target+".clip"
        print(target)

        keyboard.send("ctrl+m")
        time.sleep(1)
        keyboard.write(link)
        keyboard.send("enter")
    
    for j in range(4):
        for i in range(len(links)-1):
            keyboard.send("ctrl+shift+tab")
            time.sleep(1)
        for i in range(len(links)-1):
            keyboard.send("ctrl+tab")
            time.sleep(1)

        print(j)
    
    for target in links:
        keyboard.send("ctrl+w")
        time.sleep(1)