// Declaração global para armazenar o número do pedido
let numeroPedidoGlobal;

// Listener para receber mensagens do popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'injectScript') {
        // Chama a função para obter o número do pedido
        obterNumeroPedido();
    } else if (request.action === 'executeScript') {
        // Chama a função para extrair dados e preparar o XML
        extrairDadosEPrepararXML();
    }
});

// Função para obter o número do pedido do modal
function obterNumeroPedido() {
    // Verifica se o body tem a classe modal-open
    const isModalOpen = document.body.classList.contains('modal-open');

    if (isModalOpen) {
        // Localiza o header do modal
        const headerModal = document.querySelector('.modal-content .card-header');

        if (headerModal) {
            // Obtém o texto do header
            const headerText = headerModal.innerText.trim();

            // Verifica se o texto contém a informação do número do pedido
            const match = headerText.match(/Pedido de Certidão nº (\d+)/);

            if (match) {
                const numeroPedido = match[1];
                console.log('Número do Pedido:', numeroPedido);

                // Atribui o valor da numeroPedido à variável global
                numeroPedidoGlobal = numeroPedido;

                // Adiciona o botão dentro da tag h5
                adicionarBotaoDownload(headerModal, numeroPedido);
            } else {
                console.log('Número do Pedido não encontrado no header do modal.');
            }
        } else {
            console.log('Header do modal não encontrado.');
        }
    } else {
        console.log('O modal não está aberto.');
    }
}

// Função para adicionar o botão de download dentro da tag h5
function adicionarBotaoDownload(headerElement, numeroPedido) {
    // Cria o elemento button
    const botaoDownload = document.createElement('button');
    botaoDownload.type = 'button';
    botaoDownload.className = 'btn btn-primary';
    botaoDownload.innerHTML = '<i aria-hidden="true" class="fa fa-fw fa-download"></i>Download XML Certidão';

    // Adiciona um evento de clique ao botão
    botaoDownload.addEventListener('click', function () {
        console.log('Botão de Download Clicado para o Pedido:', numeroPedido);

        // Envia uma mensagem para o background script para executar o script de download
        chrome.runtime.sendMessage({ action: 'executeScript' });
        console.log('Chamando extrairDadosEPrepararXML...');
        extrairDadosEPrepararXML();
    });

    // Adiciona o botão dentro da tag h5
    headerElement.appendChild(botaoDownload);

    console.log('Botão de download adicionado para o Pedido:', numeroPedido);
}

// Função para extrair dados e preparar o XML
function extrairDadosEPrepararXML() {
    console.log('Iniciando a extração e preparação do XML...');
    // Localiza todos os elementos 'div' com a classe 'card'
    var cards = document.querySelectorAll('.card');
    console.log('Número de cartões encontrados:', cards.length);

    // Inicia a string XML
    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<pedidos>\n';

    // Função para verificar se um elemento contém um texto
    function containsText(element, searchText) {
        return element.innerText.includes(searchText);
    }

    // Variável para armazenar o número do pedido
    var numeroPedido;

    // Percorre cada 'div'
    cards.forEach(card => {
        // Encontrar o tipo de dados (Pedido, Certidão, Solicitante)
        var headerElement = card.querySelector('.card-header');

        if (!headerElement) {
            return; // Ignorar se não houver cabeçalho
        }

        var tipoDados = headerElement.innerText.trim();

        // Localizar o elemento 'div' com a classe 'card-body' após o cabeçalho
        var bodyElement = card.querySelector('.card-body');

        // Verificar o tipo de dados e extrair informações apropriadas
        if (tipoDados === 'Dados do Pedido' && bodyElement) {
            var numeroPedidoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Nº Pedido:'));

            // Atribui o valor da numeroPedido dentro do loop
            numeroPedido = numeroPedidoElement ? numeroPedidoElement.innerText.split('Nº Pedido:')[1].trim() : '';

            var dataPedidoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Dt. Pedido:'));
            var statusPedidoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Status:'));
            var chaveVerificacaoElement = Array.from(bodyElement.querySelectorAll('h6')).find(h6 => containsText(h6, 'Chave Verificação:'));

            // Extrair dados do pedido e adicionar ao XML
            if (numeroPedidoElement) {
                xml += '  <pedido>\n';
                xml += '    <numero>' + numeroPedido + '</numero>\n';
                xml += '    <data>' + dataPedidoElement.innerText.split('Dt. Pedido:')[1].trim() + '</data>\n';
                xml += '    <status>' + statusPedidoElement.innerText.split('Status:')[1].trim() + '</status>\n';
                xml += '    <chave_verificacao>' + chaveVerificacaoElement.innerText.split('Chave Verificação:')[1].trim() + '</chave_verificacao>\n';
                xml += '  </pedido>\n';
            }
        } else if (tipoDados === 'Dados da Certidão' && bodyElement) {
            // Extrair dados da certidão e adicionar ao XML
            var nomePesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Nome Pesquisado:'));
            var documentoPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Doc. Pesquisado:'));
            var rgPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'RG Pesquisado:'));
            var cepPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'CEP:'));
            var enderecoPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Endereço:'));
            var bairroPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Bairro:'));
            var cidadePesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Cidade:'));
            var ufPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'UF:'));
            var emailPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'E-mail:'));
            var periodoPesquisadoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Certidão relativa aos últimos 5 anos.'));
            var motivoSolicitacaoElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Motivo da Solicitação:'));

            if (nomePesquisadoElement) {
                xml += '    <certidao>\n';
                xml += '      <nome_pesquisado>' + nomePesquisadoElement.innerText.split('Nome Pesquisado:')[1].trim() + '</nome_pesquisado>\n';
                xml += '      <documento_pesquisado>' + documentoPesquisadoElement.innerText.split('Doc. Pesquisado:')[1].trim() + '</documento_pesquisado>\n';
                xml += '      <rg_pesquisado>' + rgPesquisadoElement.innerText.split('RG Pesquisado:')[1].trim() + '</rg_pesquisado>\n';
                xml += '      <cep_pesquisado>' + cepPesquisadoElement.innerText.split('CEP:')[1].trim() + '</cep_pesquisado>\n';
                xml += '      <endereco_pesquisado>' + enderecoPesquisadoElement.innerText.split('Endereço:')[1].trim() + '</endereco_pesquisado>\n';
                xml += '      <bairro_pesquisado>' + bairroPesquisadoElement.innerText.split('Bairro:')[1].trim() + '</bairro_pesquisado>\n';
                xml += '      <cidade_pesquisado>' + cidadePesquisadoElement.innerText.split('Cidade:')[1].trim() + '</cidade_pesquisado>\n';
                xml += '      <uf_pesquisado>' + ufPesquisadoElement.innerText.split('UF:')[1].trim() + '</uf_pesquisado>\n';
                xml += '      <email_pesquisado>' + emailPesquisadoElement.innerText.split('E-mail:')[1].trim() + '</email_pesquisado>\n';
                xml += '      <periodo_pesquisado>' + (periodoPesquisadoElement ? periodoPesquisadoElement.innerText.trim() : '') + '</periodo_pesquisado>\n';
                xml += '      <motivo_solicitacao>' + motivoSolicitacaoElement.innerText.split('Motivo da Solicitação:')[1].trim() + '</motivo_solicitacao>\n';
                xml += '    </certidao>\n';
            }
        } else if (tipoDados === 'Dados do Solicitante' && bodyElement) {
            // Extrair dados do solicitante e adicionar ao XML
            var nomeSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Solicitante:'));
            var documentoSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Documento:'));
            var estadoCivilSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Estado Civil:'));
            var profissaoSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Profissão:'));
            var emailSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'E-mail:'));
            var telefoneSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Telefone:'));
            var celularSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Celular:'));
            var enderecoSolicitanteElement = Array.from(bodyElement.querySelectorAll('p')).find(p => containsText(p, 'Endereço:'));

            if (documentoSolicitanteElement) {
                xml += '    <solicitante>\n';
                xml += '      <nome_solicitante>' + (nomeSolicitanteElement ? nomeSolicitanteElement.innerText.split('Solicitante:')[1].trim() : '') + '</nome_solicitante>\n';
                xml += '      <documento>' + documentoSolicitanteElement.innerText.split('Documento:')[1].trim() + '</documento>\n';
                xml += '      <estado_civil>' + estadoCivilSolicitanteElement.innerText.split('Estado Civil:')[1].trim() + '</estado_civil>\n';
                xml += '      <profissao>' + profissaoSolicitanteElement.innerText.split('Profissão:')[1].trim() + '</profissao>\n';
                xml += '      <email>' + emailSolicitanteElement.innerText.split('E-mail:')[1].trim() + '</email>\n';
                xml += '      <telefone>' + telefoneSolicitanteElement.innerText.split('Telefone:')[1].trim() + '</telefone>\n';
                xml += '      <celular>' + celularSolicitanteElement.innerText.split('Celular:')[1].trim() + '</celular>\n';
                xml += '      <endereco>' + enderecoSolicitanteElement.innerText.split('Endereço:')[1].trim() + '</endereco>\n';
                xml += '    </solicitante>\n';
            }
        }
    });

    // Fechar a tag 'pedidos'
    xml += '</pedidos>';

    // Cria um link para download do XML
    var xmlFile = new Blob([xml], { type: "text/xml" });
    var downloadLink = document.createElement("a");

    // Nome do arquivo com o número do pedido, se existir
    var fileName = numeroPedidoGlobal ? 'pedido_' + numeroPedidoGlobal + '.xml' : 'data.xml';
    downloadLink.download = fileName;

    // URL do arquivo
    downloadLink.href = window.URL.createObjectURL(xmlFile);

    // Certifica-se de que o link não seja exibido
    downloadLink.style.display = "none";

    // Adiciona o link ao DOM
    document.body.appendChild(downloadLink);
    console.log('XML preparado. Nome do arquivo:', fileName);

    // Ativa o clique no link
    downloadLink.click();
    console.log('Link de download clicado.');
}

// Cria um MutationObserver
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        // Verifica se a classe modal-open foi adicionada ou removida
        const isModalOpen = document.body.classList.contains('modal-open');
        
        if (isModalOpen) {
            // Espera um pouco antes de chamar a função para obter o número do pedido
            setTimeout(obterNumeroPedido, 1000); // Ajuste o tempo conforme necessário
        }
    });
});

// Configuração do MutationObserver para observar alterações na classe do body
const observerConfig = { attributes: true, attributeFilter: ['class'] };
observer.observe(document.body, observerConfig);
