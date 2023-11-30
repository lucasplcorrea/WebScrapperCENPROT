// Localiza todos os elementos 'div' com a classe 'card'
var cards = document.querySelectorAll('.card');

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
var fileName = numeroPedido ? 'pedido_' + numeroPedido + '.xml' : 'data.xml';
downloadLink.download = fileName;

// URL do arquivo
downloadLink.href = window.URL.createObjectURL(xmlFile);

// Certifica-se de que o link não seja exibido
downloadLink.style.display = "none";

// Adiciona o link ao DOM
document.body.appendChild(downloadLink);

// Ativa o clique no link
downloadLink.click();
