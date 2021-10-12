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
function saveOptions(e) {
    e.preventDefault()
    browser.storage.sync.set({
        keyboardprivacywhitelist: document.querySelector("#whitelist").value
    })
    browser.storage.sync.set({
      keyboardprivacylan: document.querySelector("#whitelistLAN").checked
    })
    browser.storage.sync.set({
      keyboardprivacyprompt: document.querySelector("#usePrompt").checked
    })
    document.getElementById('saved').innerHTML = '<br><b>Saved</b>'
    setTimeout(function(){
      document.getElementById('saved').innerHTML = '<br>'
    }, 3000)
  }

  function restoreOptions() {

    function setCurrentWhitelist(result) {
        if (result['keyboardprivacywhitelist']){
            document.querySelector("#whitelist").value = result['keyboardprivacywhitelist']
        }

    }
    function setCurrentLAN(result){
      document.querySelector("#whitelistLAN").checked = result['keyboardprivacylan']
    }

    function setCurrentPrompt(result){
      document.querySelector("#usePrompt").checked = result['keyboardprivacyprompt']
    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("keyboardprivacywhitelist");
    getting.then(setCurrentWhitelist, onError);

    let gettingLAN = browser.storage.sync.get("keyboardprivacylan");
    gettingLAN.then(setCurrentLAN, onError);

    let gettingPrompt = browser.storage.sync.get("keyboardprivacyprompt");
    gettingPrompt.then(setCurrentPrompt, onError);
  }

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
