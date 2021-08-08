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
    e.preventDefault();
    browser.storage.sync.set({
        keyboardprivacywhitelist: document.querySelector("#whitelist").value
    });
  }

  function restoreOptions() {

    function setCurrentChoice(result) {
        if (result['keyboardprivacywhitelist']){
            document.querySelector("#whitelist").value = result['keyboardprivacywhitelist']
        }

    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("keyboardprivacywhitelist");
    getting.then(setCurrentChoice, onError);
  }

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);