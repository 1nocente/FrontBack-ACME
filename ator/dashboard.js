import { getAtores } from "../atores.js";

// Função para contar e exibir o número de filmes cadastrados
async function contarAtores() {
    try {
        const atores = await getAtores(); // Obter a lista de filmes
        const contador = document.getElementById('contador-atores'); // Selecionar o elemento onde o contador será exibido

        if (atores.length === 1) {
            contador.textContent = `${atores.length} filme cadastrado atualmente`;
        } else {
            contador.textContent = `${atores.length} atores cadastrados atualmente`;
        }
    } catch (error) {
        console.error("Erro ao contar atores:", error);
    }
}

// Função para recarregar a página
function recarregarPagina() {
    window.location.reload();
}

// Função para criar e exibir os detalhes de cada filme
async function exibirAtores() {
    try {
        await contarAtores(); // Contar e exibir o número de filmes cadastrados
        const atores = await getAtores(); // Obter a lista de filmes

        const informacoesDiv = document.getElementById('informações'); // Selecionar a div onde as informações dos filmes serão exibidas
        informacoesDiv.innerHTML = ''; // Limpar o conteúdo antes de adicionar os filmes novamente

        atores.forEach(ator => {
            // Criar uma div para cada filme
            const atorDiv = document.createElement('div');
            atorDiv.classList.add('flex', 'flex-row', 'h-16', 'border', 'solid', 'border-b-2', 'items-center', 'border-black', 'px-20');

            // ID
            const idSpan = document.createElement('span');
            idSpan.classList.add('min-w-20', 'text-center', 'mr-20');
            idSpan.textContent = ator.id;
            atorDiv.appendChild(idSpan);

            // Nome
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            nomeSpan.textContent = ator.nome;
            atorDiv.appendChild(nomeSpan);

            // Data Nascimento
            const dataNascimentoSpan = document.createElement('span');
            dataNascimentoSpan.classList.add('min-w-60', 'text-center', 'mr-20');
            dataNascimentoSpan.textContent = validarData(ator.data_nascimento);
            atorDiv.appendChild(dataNascimentoSpan);

            // Foto
            const atorImg = document.createElement('img');
            atorImg.classList.add('h-full', 'w-16', 'text-center', 'ml-40');
            atorImg.src = ator.foto; // Define o src da imagem como a URL do ícone
            atorImg.alt = ator.biografia; // Define um texto alternativo para acessibilidade
            atorDiv.appendChild(atorImg);

            // Nacionalidae
            const nascionalidadeSpan = document.createElement('span');
            nascionalidadeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            nascionalidadeSpan.textContent = ator.nacionalidades;
            atorDiv.appendChild(nascionalidadeSpan);

            // Lixeira
            const lixeiraImg = document.createElement('img');
            lixeiraImg.classList.add('h-full', 'w-16');
            lixeiraImg.src = '../src/styles/img/lixo.png';
            lixeiraImg.style.marginLeft = '0vw';
            lixeiraImg.style.cursor = 'pointer';
            lixeiraImg.addEventListener('click', () => confirmarExclusao(ator.id));
            atorDiv.appendChild(lixeiraImg);

            // Adicionar a div do ator à div de informações
            informacoesDiv.appendChild(atorDiv);
        });

        // Adicionar um evento de rolagem à div de informações
        informacoesDiv.style.overflowY = 'scroll';
        informacoesDiv.style.maxHeight = 'calc(100vh - 250px)'; // Altura máxima para manter espaço para o cabeçalho e o rodapé
    } catch (error) {
        console.error("Erro ao exibir atores:", error);
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
function confirmarExclusao(idAtor) {
    if (confirm("Tem certeza que deseja continuar? Isto apagará o ator para sempre!")) {
        excluirAtor(idAtor);
    } else {
        // Nenhuma ação necessária, o usuário optou por não excluir o Ator
    }
}

// Função para excluir um Ator
async function excluirAtor(idAtor) {
    try {
        const url = `http://localhost:8080/v2/acmefilmes/ator/${idAtor}`;
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
            exibirAtores();
            recarregarPagina();
        } else {
            alert(data.message); // Exibir mensagem de erro
        }
    } catch (error) {
        console.error("Erro ao excluir ator:", error);
        alert("Erro ao excluir ator. Por favor, tente novamente mais tarde.");
    }
}

// Chamar a função para exibir os filmes quando a página carregar
window.onload = exibirAtores;
