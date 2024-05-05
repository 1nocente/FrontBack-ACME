import { getGeneros } from "../generos.js";

// Função para contar e exibir o número de filmes cadastrados
async function contarGeneros() {
    try {
        const generos = await getGeneros(); // Obter a lista de generos

        // Verificar se generos não é undefined antes de acessar seu length
        if (generos && generos.length !== undefined) {
            const contador = document.getElementById('contador-generos'); // Selecionar o elemento onde o contador será exibido

            if (generos.length === 1) {
                contador.textContent = `${generos.length} genero cadastrada atualmente`;
            } else {
                contador.textContent = `${generos.length} generos cadastradas atualmente`;
            }
        } else {
            console.error("Erro: A lista de genero está vazia ou undefined.");
        }
    } catch (error) {
        console.error("Erro ao contar generos:", error);
    }

}

// Função para recarregar a página
function recarregarPagina() {
    window.location.reload();
}

// Função para criar e exibir os detalhes de cada filme
async function exibirGeneros() {
    try {
        await contarGeneros(); // Contar e exibir o número de classificacoes cadastrados
        const generos = await getGeneros(); // Obter a lista de classificacoes

        const informacoesDiv = document.getElementById('informações'); // Selecionar a div onde as informações dos classificacoes serão exibidas
        informacoesDiv.innerHTML = ''; // Limpar o conteúdo antes de adicionar os classificacoes novamente

        generos.forEach(genero => {
            // Criar uma div para cada genero
            const generoDiv = document.createElement('div');
            generoDiv.classList.add('flex', 'flex-row', 'h-16', 'border', 'solid', 'border-b-2', 'items-center', 'border-black', 'px-20');

            // ID
            const idSpan = document.createElement('span');
            idSpan.classList.add('min-w-20', 'text-center', 'mr-20');
            idSpan.textContent = genero.id;
            generoDiv.appendChild(idSpan);

            // Nome
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            nomeSpan.textContent = genero.nome;
            generoDiv.appendChild(nomeSpan);

            // Lixeira
            const lixeiraImg = document.createElement('img');
            lixeiraImg.classList.add('h-full', 'w-16');
            lixeiraImg.src = '../src/styles/img/lixo.png';
            lixeiraImg.style.marginLeft = '20vw';
            lixeiraImg.style.cursor = 'pointer';
            lixeiraImg.addEventListener('click', () => confirmarExclusao(genero.id));
            generoDiv.appendChild(lixeiraImg);

            // Adicionar a div do genero à div de informações
            informacoesDiv.appendChild(generoDiv);
        });

        // Adicionar um evento de rolagem à div de informações
        informacoesDiv.style.overflowY = 'scroll';
        informacoesDiv.style.maxHeight = 'calc(100vh - 250px)'; // Altura máxima para manter espaço para o cabeçalho e o rodapé
    } catch (error) {
        console.error("Erro ao exibir generos:", error);
    }
}


// Função para confirmar a exclusão de um genero
function confirmarExclusao(idGenero) {
    if (confirm("Tem certeza que deseja continuar? Isto apagará a genero para sempre!")) {
        excluirGenero(idGenero);
    } else {
        // Nenhuma ação necessária, o usuário optou por não excluir o filme
    }
}

// Função para excluir um filme
async function excluirGenero(idGenero) {
    try {
        const url = `http://localhost:8080/v2/acmefilmes/genero/${idGenero}`;
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
            exibirGeneros();
            recarregarPagina();
        } else {
            alert(data.message); // Exibir mensagem de erro
        }
    } catch (error) {
        console.error("Erro ao excluir genero:", error);
        alert("Erro ao excluir genero. Por favor, tente novamente mais tarde.");
    }
}

// Chamar a função para exibir os filmes quando a página carregar
window.onload = exibirGeneros;
