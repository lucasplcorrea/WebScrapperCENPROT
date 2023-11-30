document.getElementById('run-script').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = tabs[0].url;
        if (url === 'https://cartorio.cenprotnacional.org.br/home/pedidos/certidao#') {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'executeScript' });
        } else {
            alert('Este script só pode ser executado na URL especificada.');
        }
    });
});