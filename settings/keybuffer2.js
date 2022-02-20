let started = false

function onError(error) {
    console.error(`Error: ${error}`);
  }

  function doSendMsg(msg, tabs) {
    let empty = false;
    if (document.getElementById('keyBuffer').value.length == 0){
      empty = true;
    }
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {keys: msg, isEmpty: empty}
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response.response);
      }).catch(onError);
    }
  }

function getCurrent(){

    browser.tabs.query({
      currentWindow: true
  }).then(function(tabs){
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {keys: "GetSet", isEmpty: false}
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response.response);

        document.getElementById('keyBuffer').value = response.response

      }).catch(onError);
    }
  }).catch(onError);
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
        doSendMsg(e.key, tabs)
    }

    browser.tabs.query({
        currentWindow: true
    }).then(sendMessageToTabs).catch(onError);

}
setTimeout(function(){getCurrent()}, 10)
document.getElementById('keyBuffer').onkeydown = sender
//document.getElementById('keyBuffer').onpaste = sender