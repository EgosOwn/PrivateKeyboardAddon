let started = false

function onError(error) {
    console.error(`Error: ${error}`);
  }

  function doSendMsg(msg, tabs) {

    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {keys: msg, getCurrent: false}
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response.response);
      }).catch(onError);
    }
  }


let sender = async function(e){

  if (e.key == 'Tab') {
    e.preventDefault();
    let start = this.selectionStart;
    let end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }

    let sendMessageToTabs = function(tabs){
        doSendMsg(document.getElementById('keyBuffer').value, tabs)
    }

    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);

}

function getCurrent(){
  browser.tabs.query({
    currentWindow: true,
    active: true
}).then(function(tabs){

  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {keys: "", getCurrent: true}
    ).then(response => {
      console.debug(response)
      if (response.response === undefined || response.response === false){
        //document.getElementById('keyBuffer').value = "No element in focus. Focus an element and reopen this."
        return
      }
      document.getElementById('keyBuffer').value = response.response
    }).catch(onError);
  }

}).catch(onError);
}

getCurrent()

document.getElementById("keyBuffer").focus()

document.getElementById('keyBuffer').onkeydown = sender
document.getElementById('keyBuffer').onpaste = sender