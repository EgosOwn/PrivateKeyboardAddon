function reportError(e){
    console.debug(e)
}

function extractHostname(url) {
    // Credit to stackoverflow users https://stackoverflow.com/a/23945027
    let hostname = ''
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

browser.storage.sync.get("keyboardprivacywhitelist")

.then(function(val){
    if (typeof val.keyboardprivacywhitelist === 'undefined'){
        return
    }
    browser.tabs.query({active: true, currentWindow: true})
    .then(function(tabVal){
        let hostname = extractHostname(tabVal[0].url).replace('www.', '')
        document.getElementById('siteDomain').innerText = hostname
        if (val.keyboardprivacywhitelist.includes(hostname)) {
            document.getElementById('toggleSite').innerText = 'Enable Keyboard Privacy'
        }
    })
    .catch(reportError);
},
    function(val){
        console.debug(val)
    }
)

function fixDuplicateCommas(){
    // Yeah i'm lazy
    browser.storage.sync.get("keyboardprivacywhitelist")

    .then(function(val){
        let whitelist = val.keyboardprivacywhitelist
        console.debug('whitelist ' + whitelist)
        if (typeof val.keyboardprivacywhitelist === 'undefined' || val.keyboardprivacywhitelist == ''){
            return
        }
        whitelist = whitelist.replaceAll(',,', '')
        if (whitelist.endsWith(',')){
            whitelist = whitelist.substring(0, whitelist.length - 1);
        }
        browser.storage.sync.set({
            keyboardprivacywhitelist: whitelist
        });
    })

}

function changeWhitelist(domain, add){
    browser.storage.sync.get("keyboardprivacywhitelist")

    .then(function(val){
        let whitelist = val.keyboardprivacywhitelist
        let comma = ','
        if (typeof val.keyboardprivacywhitelist === 'undefined' || val.keyboardprivacywhitelist == ''){
            whitelist = ''
            comma = ''
        }
        if (domain.startsWith('www.')){
            domain = domain.replace('www.', '')
        }
        if (add){
            browser.storage.sync.set({
                keyboardprivacywhitelist: whitelist + comma + domain
            });
        }
        else{
            if (! whitelist.endsWith(domain)){
                comma = ','
            }
            else{
                comma = ''
            }
            browser.storage.sync.set({
                keyboardprivacywhitelist: whitelist.replace(domain + comma, '')
            });
        }
    })

}

document.getElementById('toggleSite').onclick = async function(){
    if (document.getElementById('toggleSite').getAttribute('disabled')){
        console.debug('disabled still')
        return
    }
    document.getElementById('toggleSite').setAttribute('disabled', true)
    if (document.getElementById('toggleSite').innerText.startsWith('Disable')){
        document.getElementById('toggleSite').innerText = 'Enable Keyboard Privacy'
        changeWhitelist(document.getElementById('siteDomain').innerText, true)
    }
    else if (document.getElementById('toggleSite').innerText.startsWith('Enable')){
        document.getElementById('toggleSite').innerText = 'Disable Keyboard Privacy'
        changeWhitelist(document.getElementById('siteDomain').innerText, false)
    }
    setTimeout(function(){fixDuplicateCommas()}, 1000)
    setTimeout(function(){
        document.getElementById('toggleSite').removeAttribute('disabled')
    }, 3000)
    document.getElementById('reloadPage').style.display = 'block'
}
