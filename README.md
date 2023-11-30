# WebScrapper - CENPROT Nacional

Criei esse scrapper para download de pedidos de certidão da CENPROT Nacional, com o intuito de facilitar a emissão de certidões de protesto, o script faz uma varredura pelo pedido, e grava num arquivo XML os dados do pedido, solicitante, e pesquisado, tornando possível a integração com os sistemas de automação notarial.

O código é aberto, e livre para alterações, peço apenas que façam o fork corretamente para os devidos créditos.

>  `AVISO`.

Este código é uma produção independente e foi feito com o intuito de ajudar e facilitar a emissão de certidões de protesto, mas não possui nenhum vínculo com a CENPROT, ou qualquer outra instituição/associação de notários, registradores e/ou tabeliães de protesto.

## Features
- Realiza o download de pedidos da cenprot
- Ignora campos nulos

## To-dos
- Melhorar a interface do usuário
- Bloquear a extensão para que seja somente executada no site da cenprot
- Criar manipulador que insere um botão diretamente no pedido quando o modal estiver aberto
- Melhorar o scrapper para que ele leia os pedidos sem a necessidade de abrir um a um (Download de Pedidos em Lote)


## Instalação
Atualmente a extensão funciona apenas nos navegadores que usam motor Chromium (Google Chrome, Chromium, etc...)

```sh
1 - Baixe a pasta "Extensão" disponível nesse repositório
2 - No seu navegador acesseo menu "Gerenciar Extensões"
3 - Clique em "Carregar sem compactação" e selecione a pasta baixada
4 - Clique em "Abrir" e a extensão será carregada ao seu navegador
```

## Uso

O uso da extensão é bem simples, assim que a instalação for concluida, basta você acessar a CENPROT Nacional com o seu usuário e senha como costuma acessar, feito isso, basta acessar a tela de pedidos de certidão e abrir a certidão que deseja baixar, com a certidão aberta, clique na extensão e após clique em "Download XML".

## Erros Conhecidos

- Nos campos de endereço do solicitante da CENPROT, as tags de número e complemento estão invertidos, então nos pedidos que o solicitante preencher o campo complemento, o complemento virá antes do número, infelizmente não consegui treinar o scrapper para identificar e separar essas informações, mas caso os desenvolvedores da CENPROT corrijam isso posteriormente, eu consigo ajustar o código para também realziar essa correção.
- O site da cenprot não separa os campos do pedido com IDs únicas, então a extração dos dados se dá através de comparações com expressões comuns de cada campo. Caso haja alteração de descrições o script pode não funcionar corretamente, se isso ocorrer basta abrir uma "issue"aqui no github para que eu verifique e corrija.

## Estrutura Padrão
A estrutura padrão do XML tem o seguinte formato:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<pedidos>
    <solicitante>
      <nome_solicitante></nome_solicitante>
      <documento></documento>
      <estado_civil></estado_civil>
      <profissao></profissao>
      <email></email>
      <telefone></telefone>
      <celular></celular>
      <endereco></endereco>
    </solicitante>
  <pedido>
    <numero></numero>
    <data></data>
    <status></status>
    <chave_verificacao></chave_verificacao>
  </pedido>
    <certidao>
      <nome_pesquisado></nome_pesquisado>
      <documento_pesquisado></documento_pesquisado>
      <rg_pesquisado></rg_pesquisado>
      <cep_pesquisado></cep_pesquisado>
      <endereco_pesquisado></endereco_pesquisado>
      <bairro_pesquisado></bairro_pesquisado>
      <cidade_pesquisado></cidade_pesquisado>
      <uf_pesquisado></uf_pesquisado>
      <email_pesquisado></email_pesquisado>
      <periodo_pesquisado></periodo_pesquisado>
      <motivo_solicitacao></motivo_solicitacao>
    </certidao>
</pedidos>
```
Esse formato foi pensando já com a possibilidade de receber mais de um pedido no mesmo arquivo XML, e deve ser considerado na hora de realizar a integração com o sistema de automação.

## License
MIT
**Free Software, Hell Yeah!**
