// Verifica se a extensão deve ser ativada na página atual
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    if (currentTab.url.startsWith("https://cartorio.cenprotnacional.org.br/home/pedidos/certidao")) {
        // Adiciona um evento de clique ao botão
        function onClick() {
            // Envia a mensagem para injetar o script na página
            chrome.tabs.sendMessage(currentTab.id, { action: 'injectScript' });
        }

        document.getElementById('injectButton').addEventListener('click', onClick);

        // Adiciona um listener para remover o evento após a injeção
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                if (request.action === 'scriptInjected') {
                    document.getElementById('injectButton').removeEventListener('click', onClick);
                }
            }
        );
    } else {
        // Desabilita o botão se não estiver na página desejada
        document.getElementById('injectButton').disabled = true;
    }
});

// Adiciona um listener para os cliques nos ícones que abrem o modal
document.addEventListener('click', function (event) {
    var target = event.target;

    // Verificar se o clique foi no ícone desejado
    if (target.matches('.acoes .fa-file-text-o')) {
        // Envia uma mensagem para o content script para injetar o script na página
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'injectScript' });
        });
    }
});