console.log("hello from background.js")

chrome.alarms.onAlarm.addListener(a => {
    console.log('...', a);
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.get('alarm', alarm => {
        if (!alarm) {
            chrome.alarms.create('alarm', {periodInMinutes: 1});
        }
    });
});
var sent = false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    // if(sent) return;
    sent = true;
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // send post request
    fetch('http://localhost:3000', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
});
