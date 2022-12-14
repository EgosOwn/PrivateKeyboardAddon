# Private Keyboard - anti-biometrics Firefox addon 🦊 ⌨️ 🔒

![logo](./icons/keyboard-ico.png)

https://addons.mozilla.org/en-US/firefox/addon/private-keyboard/

----

Did you know that websites can identify you based on the way you type?

There are spy libraries that can determine how long keys are held down and the time between keys. This is apparently good enough for spying that it can be used as a form of biometric authentication, by companies like Keytrac and TypingDNA. According to TypingDNA, their software has been used for test proctoring, and in banking apps.

This addon was created to skew the key press timing by limiting the speed of presses. The speed is changed randomly on each page load, with a min of 150ms and a max of 300ms.

It uses a less than ideal thread locking solution, as simply buffering text does not stop event listeners from spies. **Now it also has a non-default setting to use prompt() on non-password single line input elements. This reduces CPU usage and increase typing speed while offering better protection than the delay approach.**

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
* Some websites override all key events in which case it is not (yet) possible to protect against keyboarding analysis there
* You may see higher CPU usage while typing. This is due do the unideal locking solution described above
* Do not confuse this with spying keyboard apps on mobile devices, this cannot address that.
* Not tested on Firefox Android
-----

Sources:

www dot keytrac dot net/en/

www dot typingdna dot com/

https://www.whonix.org/wiki/Stylometry
[https://www.whonix.org/wiki/Keystroke_Deanonymization](https://www.whonix.org/wiki/Keystroke_Deanonymization)
