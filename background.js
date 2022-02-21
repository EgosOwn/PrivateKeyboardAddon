/*
    Private Keyboard
    Copyright (C) 2021 Kevin Froman VoidNetwork LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
let lastActive = null
const defaultHosts = "<all_urls>";

let appCode = function (){
  let lastActive = document.createElement("p")
  let popupEnabled = false
  let popupGetter = browser.storage.sync.get("keyboardprivacyprompt")
  popupGetter.then(function(val){
    popupEnabled = val['keyboardprivacyprompt']
    console.debug(popupEnabled)
  }, function(){})

  let clearSelect = function()
  {
    if (window.getSelection) {window.getSelection().removeAllRanges()}
    else if
      (document.selection) {
        document.selection.empty()
      }
  }
  let minValue = 50
  let maxValue = 75
  let time = 0
  let last = null

  let doPopup = function(e) {
    let text = ""
    let inputType = ""

    if (e.target.tagName === "INPUT"){
      inputType = e.target.getAttribute("type")

      if (Date.now() - time < 1000 && e.target === last){
        return
      }
      if (! inputType){
        text = prompt("[PrivateKeyboard]\n\nEnter text for the text field:", e.target.value)
      }
      else if (! ["text", "search", "email", "number"].includes(inputType.toLowerCase())){
        return
      }
      else{
        text = prompt("[PrivateKeyboard]\n\nEnter text for the " + inputType + " field:", e.target.value)
      }
      if (text !== null) {
        e.target.value = text
      }
      last = e.target
      clearSelect()
      time = Date.now()
    }

  }

  let popupMode = function(){

    if (popupEnabled){
      document.addEventListener('focusin', doPopup, true)
    }

  }

  let mainKeyboardPrivacy = function(){
    popupMode()

    function getRandNum(){
      let buf = new Uint8Array(1)
      while (true){
        window.crypto.getRandomValues(buf);

        if (buf[0] <= maxValue && buf[0] >= minValue){
          break;
        }
        buf = new Uint8Array(1);
      }
      return buf[0];
    }
    let up = getRandNum()
    let down = getRandNum()

    console.debug('Protecting keyboard biometrics on ' + document.location.href)

    function pausecomp(millis)
    {
      // Yes i know this wastes cpu. i don't like it either, but it is the only way
      // i know of to have real page keypress events that aren't trackable
        var date = new Date();
        var curDate = null;
        do { curDate = new Date(); }
        while(curDate-date < millis);
    }

    setTimeout(function(){

      document.addEventListener('keyup', function(e){
        if (e.key.startsWith('Arrow') || e.key.startsWith('Page')){
          return true;
        }
        pausecomp(up);
        return true;
      }, )

      document.addEventListener('keydown', function(e){
        if (e.key.startsWith('Arrow') || e.key.startsWith('Page') ||

        e.key == "Enter" || e.key == "Control" || e.key == "Tab"
        ){
          return true;
        }
        else if (e.key.length > 1 && e.key.startsWith("F")){
          // Ignore function keys (unicode can also be >1 length so check for f)
          return true;
        }
        else{
        }

        if (popupEnabled){
          setTimeout(
            function(){doPopup(e)}, 10)
        }

        pausecomp(down);
        return true;
      })


    }, 100)
  }
  function checkForLANThenRun(){

    let lan = browser.storage.sync.get("keyboardprivacylan");
    lan.then(function(val){

      if (! val['keyboardprivacylan']){
        mainKeyboardPrivacy()
      }
      else{
        let hostname = document.location.hostname
        if (/^(10)\.(.*)\.(.*)\.(.*)$/.test(hostname)){
          //10.x.x.x
        }else if (/^(172)\.(1[6-9]|2[0-9]|3[0-1])\.(.*)\.(.*)$/.test(hostname)){
          //172.16.x.x - 172.31.255.255
        }else if (/^(192)\.(168)\.(.*)\.(.*)$/.test(hostname)){
          //192.168.x.x
        }else if (/^(127)\.(.*)\.(.*)\.(.*)$/.test(hostname)){
        }
        else if (hostname == '[::1]'){
        }
        else {
          mainKeyboardPrivacy()
          return
        }

        console.debug("Not running private keyboard because lan/loopback hostname")
      }

    }, function(val){mainKeyboardPrivacy()})

  }
  function shouldRunKeyboardPrivacy(value){
    if (typeof value.keyboardprivacywhitelist === 'undefined'){
      mainKeyboardPrivacy()
      return
    }
    let vals = value.keyboardprivacywhitelist.split(',')
    for (i = 0; i < vals.length; i++){
      if (vals[i] === document.location.hostname || 'www.' + vals[i] === document.location.hostname){
        console.debug(document.location.hostname + ' whitelisted for no keyboard privacy')
        return
      }
    }
    checkForLANThenRun()

  }
  function noKeyboardPrivacySettings(value){
    mainKeyboardPrivacy()
  }

  let whitelist = browser.storage.sync.get("keyboardprivacywhitelist");
  whitelist.then(shouldRunKeyboardPrivacy, noKeyboardPrivacySettings)


  document.addEventListener('focus', function(e){
    let active = document.activeElement;
    if (active.tagName == "INPUT" || active.tagName == "TEXTAREA") {
      lastActive = active
    }
  })

  browser.runtime.onMessage.addListener(request => {
    let active = document.activeElement

    if (request.getCurrent){
      if (active.tagName != "INPUT" && active.tagName != "TEXTAREA") {
        if (lastActive.tagName != "INPUT" && lastActive.tagName != "TEXTAREA"){
          console.debug("no current active or last active")
          return Promise.resolve({response: false});
        }
        return Promise.resolve({response: lastActive.value});
      }
      return Promise.resolve({response: active.value});
    }
    if (active.tagName != "INPUT" && active.tagName != "TEXTAREA"){

      lastActive.value = request.keys
    }
    else{
      document.activeElement.value = request.keys
      lastActive = document.activeElement
    }
    return Promise.resolve({response: "ack"});
  });

}

const dummyStr = ''

let defaultCode = dummyStr + appCode;
defaultCode = defaultCode.replace('function (){', 'function keyboardPrivacy(){')

async function register(hosts, code) {

  return await browser.contentScripts.register({
    matches: [hosts],
    js: [{code}],
    runAt: "document_idle",
    "allFrames": true
  });

}

var registered = register(defaultHosts, defaultCode + ' keyboardPrivacy()');