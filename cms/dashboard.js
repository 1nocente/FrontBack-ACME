import { getFilmes } from "../filmes.js";

// Função para criar e exibir os detalhes de cada filme
async function exibirFilmes() {
    try {
        const filmes = await getFilmes(); // Obter a lista de filmes

        const informacoesDiv = document.getElementById('informações'); // Selecionar a div onde as informações dos filmes serão exibidas

        filmes.forEach(filme => {
            // Criar uma div para cada filme
            const filmeDiv = document.createElement('div');
            filmeDiv.classList.add('flex', 'flex-row', 'h-16', 'border', 'solid', 'border-b-2', 'items-center', 'border-black', 'px-20');

            // ID
            const idSpan = document.createElement('span');
            idSpan.classList.add('min-w-20', 'text-center', 'mr-20');
            idSpan.textContent = filme.id;
            filmeDiv.appendChild(idSpan);

            // Nome
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            nomeSpan.textContent = filme.nome;
            filmeDiv.appendChild(nomeSpan);

            // Data
            const dataSpan = document.createElement('span');
            dataSpan.classList.add('min-w-60', 'text-center', 'mr-20');
            dataSpan.textContent = validarData(filme.data_lancamento);
            filmeDiv.appendChild(dataSpan);

            // Valor
            const valorSpan = document.createElement('span');
            valorSpan.classList.add('min-w-60', 'text-center', 'mr-20');
            valorSpan.textContent = `R$${filme.valor_unitario.toFixed(2)}`;
            filmeDiv.appendChild(valorSpan);

            // Lixeira
            const lixeiraImg = document.createElement('img');
            lixeiraImg.classList.add('h-full', 'w-16');
            lixeiraImg.src = '../src/styles/img/lixo.png';
            lixeiraImg.style.marginLeft = '20vw'
            lixeiraImg.style.cursor = 'pointer'
            filmeDiv.appendChild(lixeiraImg);

            // Adicionar a div do filme à div de informações
            informacoesDiv.appendChild(filmeDiv);
        });

        // Adicionar um evento de rolagem à div de informações
        informacoesDiv.style.overflowY = 'scroll';
        informacoesDiv.style.maxHeight = 'calc(100vh - 250px)'; // Altura máxima para manter espaço para o cabeçalho e o rodapé
    } catch (error) {
        console.error("Erro ao exibir filmes:", error);
    }
}

// Função para validar a data
function validarData(data) {
    const dataReduzida = data.substr(0, 10);
    const dataSplit = dataReduzida.split('-');
    const dataFinal = dataSplit[2] + '/' + dataSplit[1] + '/' + dataSplit[0];
    return dataFinal;
}

// Chamar a função para exibir os filmes quando a página carregar
window.onload = exibirFilmes;
