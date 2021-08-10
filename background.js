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
const defaultHosts = "<all_urls>";

let appCode = function (){
  const maxValue = 150
  const minValue = 25

  let mainKeyboardPrivacy = function(){

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

    console.debug('Protecting keyboard biometrics on ' + document.location.href)

    function pausecomp(millis)
    {
      // Yes i know this wastes cpu. i don't like it either, but it seems a blocking
      // approach is needed to prevent spying event listeners from reading key events in *real time*
      // Might use an off-page buffer solution in the future
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
        pausecomp(getRandNum());
        return true;
      }, )

      document.addEventListener('keydown', function(e){
        if (e.key.startsWith('Arrow') || e.key.startsWith('Page')){
          return true;
        }
        pausecomp(getRandNum());
        return true;
      })


    }, 100)
  }
  function shouldRunKeyboardPrivacy(value){
    if (typeof value.keyboardprivacywhitelist == undefined){
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
    mainKeyboardPrivacy()
  }
  function noKeyboardPrivacySettings(){
    mainKeyboardPrivacy()
  }


  let whitelist = browser.storage.sync.get("keyboardprivacywhitelist");
  whitelist.then(shouldRunKeyboardPrivacy, noKeyboardPrivacySettings)

}

const dummyStr = ''

let defaultCode = dummyStr + appCode;
defaultCode = defaultCode.replace('function (){', 'function keyboardPrivacy(){')
console.debug(defaultCode)

async function register(hosts, code) {

  return await browser.contentScripts.register({
    matches: [hosts],
    js: [{code}],
    runAt: "document_idle",
    "allFrames": true
  });

}

var registered = register(defaultHosts, defaultCode + ' keyboardPrivacy()');