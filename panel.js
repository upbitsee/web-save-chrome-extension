var requestCounter = 0;
chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
        let message = {request, body};
        requestCounter += 1;
        document.querySelector("#counter").textContent = requestCounter;
        let pre = document.querySelector("pre#lastRequest");
        // chrome.extension.getBackgroundPage().console.info(message)
        pre.textContent = JSON.stringify(message, null, 2);
        chrome.runtime.sendMessage(message);
    });
  });

