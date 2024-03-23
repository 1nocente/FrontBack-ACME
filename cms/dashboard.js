import { getFilmes } from "../filmes.js";

// Função para contar e exibir o número de filmes cadastrados
async function contarFilmes() {
    try {
        const filmes = await getFilmes(); // Obter a lista de filmes
        const contador = document.getElementById('contador-filmes'); // Selecionar o elemento onde o contador será exibido

        if (filmes.length === 1) {
            contador.textContent = `${filmes.length} filme cadastrado atualmente`;
        } else {
            contador.textContent = `${filmes.length} filmes cadastrados atualmente`;
        }
    } catch (error) {
        console.error("Erro ao contar filmes:", error);
    }
}

// Função para recarregar a página
function recarregarPagina() {
    window.location.reload();
}

// Função para criar e exibir os detalhes de cada filme
async function exibirFilmes() {
    try {
        await contarFilmes(); // Contar e exibir o número de filmes cadastrados
        const filmes = await getFilmes(); // Obter a lista de filmes

        const informacoesDiv = document.getElementById('informações'); // Selecionar a div onde as informações dos filmes serão exibidas
        informacoesDiv.innerHTML = ''; // Limpar o conteúdo antes de adicionar os filmes novamente

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
            lixeiraImg.style.marginLeft = '20vw';
            lixeiraImg.style.cursor = 'pointer';
            lixeiraImg.addEventListener('click', () => confirmarExclusao(filme.id));
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

// Função para confirmar a exclusão de um filme
function confirmarExclusao(idFilme) {
    if (confirm("Tem certeza que deseja continuar? Isto apagará o filme para sempre!")) {
        excluirFilme(idFilme);
    } else {
        // Nenhuma ação necessária, o usuário optou por não excluir o filme
    }
}

// Função para excluir um filme
async function excluirFilme(idFilme) {
    try {
        const url = `http://localhost:8080/v2/acmefilmes/filme/${idFilme}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Se necessário, adicione quaisquer headers de autenticação aqui
            }
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Exibir mensagem de sucesso
            // Atualizar a lista de filmes após a exclusão (opcional)
            exibirFilmes();
            recarregarPagina();
        } else {
            alert(data.message); // Exibir mensagem de erro
        }
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
        alert("Erro ao excluir filme. Por favor, tente novamente mais tarde.");
    }
}

// Chamar a função para exibir os filmes quando a página carregar
window.onload = exibirFilmes;
