# Private Keyboard - anti-biometrics Firefox addon 🔒 ⌨️ 🔒

Did you know that websites can identify you based on the way you type?

There are spy frameworks that can determine how long keys are held down and the time between keys. This is apparently good enough for spying that it can be used as a form of biometric authentication, by companies like Keytrac and TypingDNA. According to TypingDNA, their software has been used for test proctoring, and in banking apps.

This addon was created to skew the key press timing by limiting the speed of presses. The speed is changed randomly on each page load, with a max of 75ms.

It uses a less than ideal thread locking solution, as simply buffering text does not stop event listeners from spies.

You can whitelist domains that you trust on the addon settings page, but it was decided not to support changing the key speed manually as that would add another fingerprinting avenue.

Development Roadmap:

* Menu button to add whitelisted domain more quickly
* Buffered window/menu/popup option to type quickly but prevent page surveillance
* More throrough testing against different avenues of keyboard surveillance
* Stylometry protection

-----

# Caveats

* **This addon may not defeat all types of keyboard biometric surveillance**, however it was tested against the Keytrac and TypingDNA demos and it worked well.
* **This addon does not yet deal with stylometry**
* You may see higher CPU usage while typing. This is due do the unideal locking solution described above
* Do not confuse this with spying keyboard apps on mobile devices, this cannot address that.
* Not tested on Firefox Android
-----

Sources:

https://www.keytrac.net/en/
https://www.typingdna.com/
https://www.whonix.org/wiki/Stylometry
[https://www.whonix.org/wiki/Keystroke_Deanonymization](https://www.whonix.org/wiki/Keystroke_Deanonymization)

(Spy companies not linked to avoid helping their SEO)