
import { getFilmes } from "./filmes.js";

function carousel() {
  const imageCarousel = document.getElementById('imageCarousel');
  let currentIndex = 0;
  let listaFilmesDatabase;

  async function carregarFilme() {
      listaFilmesDatabase = await getFilmes();

      setInterval(() => {
          currentIndex = (currentIndex + 1) % listaFilmesDatabase.length;
          const filmeAtual = listaFilmesDatabase[currentIndex];
          imageCarousel.style.backgroundImage = `url(${filmeAtual.foto_capa})`;
          imageCarousel.style.backgroundSize = 'cover'
          imageCarousel.style.backgroundPosition = 'center'
      }, 5000); // Trocar imagem a cada 5 segundos
  }

  carregarFilme();
}

async function carregarFilmes() {
    const listaFilmesDatabase = await getFilmes();
    const listaFilmesElemento = document.getElementById("listaFilmes");

    // Limpa o conteúdo atual do elemento
    listaFilmesElemento.innerHTML = '';

    listaFilmesDatabase.forEach(filme => {
        const divFilme = document.createElement("div");
        divFilme.classList.add("filme");
        divFilme.style.backgroundImage = `url(${filme.foto_capa})`;
        listaFilmesElemento.appendChild(divFilme);
    });
}

async function carregarFilme() {
    const listaFilmesDatabase = await getFilmes();
    const listaFilmesElemento = document.getElementById("listaFilmes");

    // Limpa o conteúdo atual dos elementos
    listaFilmesElemento.innerHTML = '';

    listaFilmesDatabase.forEach(filme => {
        const divFilme = document.createElement("div");
        
        divFilme.classList.add("filme");
        divFilme.style.backgroundImage = `url(${filme.foto_capa})`;

        // Adiciona evento de clique para exibir detalhes do filme
        divFilme.addEventListener("click", () => exibirDetalhes(filme), function(){

            
            fundo.classList.add('aparecer_fundo')
            fundo.appendChild(divFilme.foto_capa)
    
    
            });

        listaFilmesElemento.appendChild(divFilme);

    });
}

function exibirDetalhes(filme) {
    imageCarousel.innerHTML = '';


    // Criar div para exibir os detalhes do filme
    const divDetalhes = document.createElement("div");
    divDetalhes.style.backgroundColor = 'black'
    divDetalhes.style.width = '100vw'
    divDetalhes.style.padding = '2vh'
    divDetalhes.classList.add("detalhes");

    // Exibir foto da capa
    const imgCapa = document.createElement("img");
    imgCapa.src = filme.foto_capa;
    imgCapa.style.height = '30vh'
    divDetalhes.appendChild(imgCapa);

    // Titulo
    const tituloFilme = document.createElement('h1')
    tituloFilme.style.color = 'white'
    tituloFilme.style.fontSize = '3vh'
    tituloFilme.style.fontWeight = 'bold'
    tituloFilme.textContent = `Titulo : ${filme.nome}`
    divDetalhes.appendChild(tituloFilme)

     // Container para as imagens
const imagensContainer = document.createElement('div');
imagensContainer.style.display = 'flex'; // Configura o contêiner para usar flexbox
imagensContainer.style.alignItems = 'center'; // Alinha os itens verticalmente no centro
imagensContainer.style.gap = '10px'; // Espaçamento entre as imagens

// Primeira imagem
const comprarImagem = document.createElement('img');
comprarImagem.src = './src/styles/img/comprar.png';
comprarImagem.alt = 'Comprar'; // Adicione uma descrição adequada para acessibilidade
comprarImagem.style.cursor = 'pointer'; // Altera o cursor ao passar o mouse sobre a imagem

// Segunda imagem
const assistirImagem = document.createElement('img');
assistirImagem.src = './src/styles/img/assistir.png';
assistirImagem.alt = 'Assistir'; // Adicione uma descrição adequada para acessibilidade
assistirImagem.style.cursor = 'pointer'; // Altera o cursor ao passar o mouse sobre a imagem

// Adiciona as imagens ao contêiner
imagensContainer.appendChild(comprarImagem);
imagensContainer.appendChild(assistirImagem);

// Adiciona o contêiner de imagens ao divDetalhes
divDetalhes.appendChild(imagensContainer);
   
    // valor do filme
    const valorFilme = document.createElement('h2')
   valorFilme.style.color = 'white'
   valorFilme.textContent = `Valor: $${filme.valor_unitario.toFixed(2)}`
    valorFilme.style.fontSize = '2.5vh'
   divDetalhes.appendChild(valorFilme)

  



    // Data lancamento
    const dataLancamento = document.createElement("h2");
    dataLancamento.style.color = 'white'
    dataLancamento.textContent = `Data de Lançamento: ${validarData(filme.data_lancamento)}`;
    dataLancamento.style.fontSize = '2.5vh'
    divDetalhes.appendChild(dataLancamento);




    imageCarousel.appendChild(divDetalhes);

    const duracao = document.createElement("h2");
    duracao.style.color = 'white'
    duracao.textContent = `Duração: ${filme.duracao.substring(11, 19)}`;
    duracao.style.fontSize = '2.5vh'
    divDetalhes.appendChild(duracao);


const generos = document.createElement("h2");
 generos.style.color = 'white';
 generos.textContent = `Gênero: ${filme.generos.join(', ')}`;
 generos.style.fontSize = '2.5vh';
 divDetalhes.appendChild(generos);

 

 // Sinopse
 const sinopse = document.createElement("h2");
 sinopse.style.color = 'white'
 sinopse.textContent = `Sinopse: ${filme.sinopse}`;
 sinopse.style.fontSize = '2.5vh'
 divDetalhes.appendChild(sinopse);

 const elenco = document.createElement("h2");
 elenco.style.color = 'white';
 elenco.textContent = `Estrelando: ${filme.atores.join(', ')}`;
 elenco.style.fontSize = '2.5vh';
 divDetalhes.appendChild(elenco);
 
 
 const diretores = document.createElement("h2");
 diretores.style.color = 'white';
 diretores.textContent = `Dirigido Por: ${filme.diretores.join(', ')}`;
 diretores.style.fontSize = '2.5vh';
 divDetalhes.appendChild(diretores);

 }





function validarData (data) {
    const dataReduzida = data.substr(0,10)

    const dataSplit = dataReduzida.split ('-')

    const dataFinal = dataSplit[2] + '/' + dataSplit[1] + '/' + dataSplit [0]

    return dataFinal
}


carregarFilmes();
carregarFilme();
carousel()

