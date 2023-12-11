document.addEventListener("DOMContentLoaded", function () {
  // Adiciona a classe 'active' à Tab 1
  const defaultTab = document.getElementById("tab1");
  defaultTab.classList.add("active");

  // Exibe o conteúdo correspondente à Tab 1
  const defaultTabContent = document.getElementById("tab1-content");
  defaultTabContent.classList.add("tab-content--active");
  generateTabItems(defaultTab, defaultTabContent);

  // Adiciona o evento de clique às abas
  const allLinks = document.querySelectorAll(".tabs a");
  const allTabs = document.querySelectorAll(".tab-content");

  allLinks.forEach((elem) => {
    elem.addEventListener("click", function () {
      const linkId = elem.id;
      const hrefLinkClick = elem.href;

      allLinks.forEach((link) => {
        if (link.href == hrefLinkClick) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      allTabs.forEach((tab) => {
        if (tab.id.includes(linkId)) {
          tab.classList.add("tab-content--active");
          removeAllTabItems();
          generateTabItems(elem, tab);
        } else {
          tab.classList.remove("tab-content--active");
        }
      });
    });
  });

  // Função para remover todos os itens da aba
  function removeAllTabItems() {
    allTabs.forEach((tab) => {
      tab.innerHTML = "";
    });
  }

  function generateTabItems(elem, tab) {
    if (elem.id === "tab1") {
      // Conteúdo para a primeira aba
      tab.innerHTML = `
          <div class="record">
              <div class="avatar__wrapper">
                  <img src="https://i.imgur.com/hHJTSU7.png" class="avatar avatar--games" alt="Profile">
              </div>
              <div class="content">
                  <div class="title-description">
                      <div class="title">
                          Script Para Download
                      </div>
                      <div class="description">
                          Injete o script na página de pedidos da CENPROT
                      </div>
                  </div>
                  <a href="#" id="injectButton" class="explore-button" title="Injetar Script">
                      Injetar
                  </a>
              </div>
          </div>
      `;
    } else if (elem.id === "tab2") {
      // Conteúdo para a segunda aba
      tab.innerHTML = `
          <div class="record">
              <div class="avatar__wrapper">
                  <img src="https://i.imgur.com/hHJTSU7.png" class="avatar avatar--games" alt="GitHub do Projeto">
              </div>
              <div class="content">
                  <div class="title-description">
                      <div class="title">
                          Github do Projeto
                      </div>
                      <div class="description">
                          Conheça a página do projeto e outras versões
                      </div>
                  </div>
                  <a href="https://github.com/lucasplcorrea/WebScrapperCENPROT" target="_blank" class="explore-button" title="GitHub do Projeto">
                      Explorar
                  </a>
              </div>
          </div>
          <div class="record">
              <div class="avatar__wrapper">
                  <img src="https://i.imgur.com/hHJTSU7.png" class="avatar avatar--games" alt="Como usar">
              </div>
              <div class="content">
                  <div class="title-description">
                      <div class="title">
                          Como usar
                      </div>
                      <div class="description">
                          Visite a página de ajuda para aprender a utilizar a extensão
                      </div>
                  </div>
                  <a href="https://github.com/lucasplcorrea/WebScrapperCENPROT?tab=readme-ov-file#uso" target="_blank" class="explore-button" title="Como usar">
                      Explorar
                  </a>
              </div>
          </div>
      `;
    }
  }
});
