chrome.runtime.onInstalled.addListener(function () {
    console.log("WebScrapper Cenprot Installed!");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "runScript") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var url = tabs[0].url;
            if (url.includes("https://cartorio.cenprotnacional.org.br/")) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: runScript,
                });
            } else {
                alert("Este script só pode ser executado na URL especificada.");
            }
        });
    }
});

function runScript() {
    console.log("Script being executed...");

    // Enviar mensagem para o script.js na página
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "executeScript" });
    });
}
