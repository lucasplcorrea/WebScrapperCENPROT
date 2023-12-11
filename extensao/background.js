// Cria um objeto para rastrear os listeners
let listeners = {};

// Escuta as mensagens da extensão
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Verifica a ação na mensagem
        if (request.action === "injectScript") {
            // Executa o script na página
            chrome.scripting.executeScript({
                target: { tabId: sender.tab.id },
                function: obterNumeroPedido
            });

            // Notifica que o script foi injetado
            chrome.tabs.sendMessage(sender.tab.id, { action: 'scriptInjected' });

            // Remove qualquer listener remanescente
            if (listeners[sender.tab.id]) {
                chrome.tabs.onRemoved.removeListener(listeners[sender.tab.id]);
            }

            // Adiciona um listener para remover o ouvinte quando a guia for fechada
            listeners[sender.tab.id] = function () {
                delete listeners[sender.tab.id];
            };

            chrome.tabs.onRemoved.addListener(listeners[sender.tab.id]);
        }
    }
);
