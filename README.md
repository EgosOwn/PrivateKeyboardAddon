# Private Keyboard - anti-biometrics Firefox addon 🦊 ⌨️ 🔒

![logo](./icons/keyboard-ico.png)

https://addons.mozilla.org/en-US/firefox/addon/private-keyboard/

----

Did you know that websites can identify you based on the way you type?

There are spy libraries that can determine how long keys are held down and the time between keys. This is apparently good enough for spying that it can be used as a form of biometric authentication, by companies like Keytrac and TypingDNA. According to TypingDNA, their software has been used for test proctoring, and in banking apps.

This addon was created to skew the key press timing by limiting the speed of presses. The speed is changed randomly on each page load, with a min of 150ms and a max of 300ms.

You can whitelist domains that you trust on the addon settings page, but it was decided not to support changing the key speed manually as that would add another fingerprinting avenue.

# Usage

This addon has two methods of protecting yourself.

## On-page protection

The easiest is to simply type on a page as normal. This method breaks the least amount of websites, but it can be frustrating to type a lot and it causes CPU spikes because of a limitation in javascript event processing.

You can whitelist sites by using the button in the addon's popup or by manually adding them on the addon settings page.

## Toolbar input

You can also enter text into the textarea in the toolbar button which will be instantly transfered to the page. This method allows you to type without lag, but it breaks on many websites and can still be tracked if a website is checking input changes as opposed to key events.

To avoid using the mouse to do this, you can press ctrl+1 (config [the same way as any addon](https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox)) to open the popup and press esc when done.



# Development Roadmap:

* ~~Menu button to add whitelisted domain more quickly~~
* ~~Buffered window/menu/popup option to type quickly but prevent page surveillance~~
* Identify websites that break on-page protection by lighting up the icon when on page protection is active
* More throrough testing against different avenues of keyboard surveillance
* Stylometry protection

-----

# Caveats

* **This addon may not defeat all types of keyboard biometric surveillance**, however it was tested against the Keytrac and TypingDNA demos and it worked well.
* **It is recommended to turn on privacy.resistFingerprinting to avoid leaking your keyboard layout; however this addon protects against that as well if you strictly use the toolbar box**
* **This addon does not yet deal with stylometry**
* Some websites override all key events in which case only the toolbar button can protect you (but it likely doesn't function if this is the case)
* Typing directly on pages will have CPU spikes due to a browser limitation
* Of course, this cannot protect against malware on your device outside the webpage.
* Not tested on Firefox Android
-----

Sources:

www dot keytrac dot net/en/

www dot typingdna dot com/

(If you try the spy software demos, keep in mind that this addon changes your fingerprint for on-page typing on reload)

Keep in mind that scripts embeded on pages are not the only way to spy on you. [CSS can record keystrokes](https://css-tricks.com/css-keylogger/) and things such as autocomplete or typing notifications may measure your typing speed server side.

https://www.whonix.org/wiki/Stylometry
[https://www.whonix.org/wiki/Keystroke_Deanonymization](https://www.whonix.org/wiki/Keystroke_Deanonymization)
