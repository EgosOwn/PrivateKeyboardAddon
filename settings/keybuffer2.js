
function onError(error) {
    console.error(`Error: ${error}`);
  }

  function doSendMsg(msg, tabs) {
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {keys: msg}
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response.response);
      }).catch(onError);
    }
  }


let sender = async function(e){



    let sendMessageToTabs = function(tabs){
        doSendMsg(e.key, tabs)
    }

    browser.tabs.query({
        currentWindow: true
    }).then(sendMessageToTabs).catch(onError);

}

document.getElementById('keyBuffer').onkeydown = sender
//document.getElementById('keyBuffer').onpaste = sender