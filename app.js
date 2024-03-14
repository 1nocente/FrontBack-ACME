

import { getFilmes, getImage } from "./filmes.js";

function preloadImages(filmes) {
    filmes.forEach(filme => {
        const img = new Image();
        img.src = filme.imagem;
    });
}
console.log('teste')


// Seleciona a imagem pelo ID
    const logoInicio = document.getElementById('logoinicio');

    // Função para esconder a imagem após 2 segundos
    function esconderLogo() {
        logoInicio.style.display = 'none';
    }

    // Agendar a função para ser chamada após 2 segundos
    setTimeout(esconderLogo, 3500);

// function carousel antiga
// document.addEventListener('DOMContentLoaded', function () {
//     const imageCarousel = document.getElementById('imageCarousel');
//     const filmTitle = document.getElementById('filmTitle');
//     let currentIndex = 0;

//     function carregarFilmes() {
//         fetch('./src/filmes.json') // Altere o caminho conforme necessário
//             .then(response => response.json())
//             .then(data => {
//                 const filmes = data.filmes;
//                 preloadImages(filmes)
//                 setInterval(() => avancarFilme(filmes), 5000);
//             })
//             .catch(error => console.error('Erro ao carregar filmes:', error));
//     }

//     function carregarFilme(index, filmes) {
//         const filme = filmes[index];
//         imageCarousel.style.backgroundImage = `url(${filme.imagem})`;
//         imageCarousel.style.backgroundSize = 'cover'
//         imageCarousel.style.backgroundPosition = 'center'
//         imageCarousel.style.backgroundRepeat = 'no-repeat'
//     }

//     function avancarFilme(filmes) {
//         currentIndex = (currentIndex + 1) % filmes.length;
//         carregarFilme(currentIndex, filmes);
//     }

//     // Iniciar o carregamento dos filmes ao carregar a página
//     carregarFilmes();


    
// });

function carousel () {
  const imageCarousel = document.getElementById('imageCarousel');
  const filmTitle = document.getElementById('filmTitle');
  let currentIndex = 0;

  // function carregarFilmes() {
  //     fetch('./') // Altere o caminho conforme necessário
  //         .then(response => response.json())
  //         .then(data => {
  //             const filmes = data.filmes;
  //             preloadImages(filmes)
  //             setInterval(() => avancarFilme(filmes), 5000);
  //         })
  //         .catch(error => console.error('Erro ao carregar filmes:', error));
  // }

  async function carregarFilme() {

    const listaFilmesDatabase = await getFilmes();
    const imageCarousel = document.getElementById('imageCarousel');
    const filmes = []
  
    // Carregar todas as imagens
    listaFilmesDatabase.forEach(filme => {

      const img = document.createElement('img');
      img.src = filme.foto_capa;
      imageCarousel.appendChild(img);
    });
  
    // Trocar imagens automaticamente
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % listaFilmesDatabase.length;
      const img = imageCarousel.children[currentIndex];
      img.src = listaFilmesDatabase[currentIndex].foto_capa;
    }, 2000); // Trocar imagem a cada 3 segundos
  
    // Lidar com erros de carregamento
    imageCarousel.addEventListener('error', (event) => {
      const img = event.target;
      console.log(`Erro ao carregar imagem: ${img.src}`); // Exibir mensagem de erro no console
    });
  
  }

  carregarFilme();


  
}

carousel()

function Lista () {
  const listaFilmes = document.getElementById('listaFilmes');

  function carregarFilmes() {
    fetch('./src/filmes.json')
      .then(response => response.json())
      .then(data => {
        const filmes = data.filmes;
        criarListaFilmes(filmes);
      })
      .catch(error => console.error('Erro ao carregar filmes:', error));
  }

  function criarListaFilmes(filmes) {
    filmes.forEach(filme => {
      const divFilme = document.createElement('div');
      divFilme.classList.add('w-80', 'listaFilmes', 'flex-shrink-0'); // Adiciona a classe listaFilmes

      const imagemFilme = document.createElement('img');
      imagemFilme.src = filme.imagem;
      imagemFilme.alt = filme.titulo;
      imagemFilme.classList.add('w-full', 'h-auto', 'cursor-pointer'); // Estilos do Tailwind
      imagemFilme.setAttribute('data-id', filme.id); // Adiciona o atributo `data-id` com o ID do filme

      divFilme.appendChild(imagemFilme);
      listaFilmes.appendChild(divFilme);
    });
  }

  carregarFilmes();

  function showOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }

function buscarInformacoesFilme(idFilme) {


    // Verifique se a variável filmes está definida
const filmes = listaFilmes;

    if (filmes) {
        // Busca o filme no JSON
        const filme = filmes.find(filme => filme.id === idFilme);

        if(filmes) {
         console.log('Filme encontrado:', filme);
         } else {  console.error("O filme com o ID especificado não foi encontrado.");
         }
    } else {
        console.error("A variável 'filmes' não foi inicializada corretamente.");
    }

  
    // Cria a nova div com as informações do filme
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('bg-black', 'bg-opacity-75', 'absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'flex', 'justify-center', 'items-center');

    const conteudoDiv = `
      <div class="w-full max-w-md bg-white rounded-lg p-4">
        <img src="${filme.imagem}" class="w-full h-auto mb-4" />
        <h2 class="text-2xl font-bold mb-2">${filme.titulo}</h2>
        <ul class="list-none">
          <li><span class="font-bold">Sinopse:</span> ${filme.sinopse}</li>
          <li><span class="font-bold">Data de lançamento:</span> ${filme.dataLancamento}</li>
          <li><span class="font-bold">Duração:</span> ${filme.duracao}</li>
          <li><span class="font-bold">Preço:</span> ${filme.preco}</li>
        </ul>
      </div>
    `;

    novaDiv.innerHTML = conteudoDiv;

    // Exibe a nova div na tela
    document.body.appendChild(novaDiv);

    showOverlay(); // Exibe a overlay após a criação da nova div
  }

  listaFilmes.addEventListener('click', (event) => {
    // Pega o elemento que foi clicado
    const elementoClicado = event.target;

    // Verifica se o elemento clicado é uma imagem
    if (elementoClicado.tagName === 'IMG') {
      // Pega o ID do filme a partir do atributo `data-id` da imagem
      const idFilme = elementoClicado.getAttribute('data-id');

      // Exibe o ID do filme no console para verificar
      console.log(`ID do filme: ${idFilme}`);

      // Chama a função para buscar e exibir as informações do filme
      buscarInformacoesFilme(idFilme) 
    }
  });
}
Lista()


