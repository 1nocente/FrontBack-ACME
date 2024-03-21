
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

