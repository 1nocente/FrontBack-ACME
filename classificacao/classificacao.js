import { getClassificacoes } from "../classificacoes.js";

// Função para contar e exibir o número de filmes cadastrados
async function contarClassificacoes() {
    try {
        const classificacoes = await getClassificacoes(); // Obter a lista de classificacoes

        // Verificar se classificacoes não é undefined antes de acessar seu length
        if (classificacoes && classificacoes.length !== undefined) {
            const contador = document.getElementById('contador-classificacoes'); // Selecionar o elemento onde o contador será exibido

            if (classificacoes.length === 1) {
                contador.textContent = `${classificacoes.length} classificacao cadastrada atualmente`;
            } else {
                contador.textContent = `${classificacoes.length} classificacoes cadastradas atualmente`;
            }
        } else {
            console.error("Erro: A lista de classificações está vazia ou undefined.");
        }
    } catch (error) {
        console.error("Erro ao contar classificacoes:", error);
    }

}

// Função para recarregar a página
function recarregarPagina() {
    window.location.reload();
}

// Função para criar e exibir os detalhes de cada filme
async function exibirClassificacoes() {
    try {
        await contarClassificacoes(); // Contar e exibir o número de classificacoes cadastrados
        const classificacoes = await getClassificacoes(); // Obter a lista de classificacoes

        const informacoesDiv = document.getElementById('informações'); // Selecionar a div onde as informações dos classificacoes serão exibidas
        informacoesDiv.innerHTML = ''; // Limpar o conteúdo antes de adicionar os classificacoes novamente

        classificacoes.forEach(classificacao => {
            // Criar uma div para cada classificacao
            const classificacaoDiv = document.createElement('div');
            classificacaoDiv.classList.add('flex', 'flex-row', 'h-16', 'border', 'solid', 'border-b-2', 'items-center', 'border-black', 'px-20');

            // ID
            const idSpan = document.createElement('span');
            idSpan.classList.add('min-w-20', 'text-center', 'mr-20');
            idSpan.textContent = classificacao.id;
            classificacaoDiv.appendChild(idSpan);

            // Nome
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            nomeSpan.textContent = classificacao.faixa_etaria;
            classificacaoDiv.appendChild(nomeSpan);

            // Icone
            const iconeSpan = document.createElement('span');
            iconeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            iconeSpan.textContent = classificacao.icone;
            classificacaoDiv.appendChild(iconeSpan);

            // Lixeira
            const lixeiraImg = document.createElement('img');
            lixeiraImg.classList.add('h-full', 'w-16');
            lixeiraImg.src = '../src/styles/img/lixo.png';
            lixeiraImg.style.marginLeft = '20vw';
            lixeiraImg.style.cursor = 'pointer';
            lixeiraImg.addEventListener('click', () => confirmarExclusao(classificacao.id));
            classificacaoDiv.appendChild(lixeiraImg);

            // Adicionar a div do classificacao à div de informações
            informacoesDiv.appendChild(classificacaoDiv);
        });

        // Adicionar um evento de rolagem à div de informações
        informacoesDiv.style.overflowY = 'scroll';
        informacoesDiv.style.maxHeight = 'calc(100vh - 250px)'; // Altura máxima para manter espaço para o cabeçalho e o rodapé
    } catch (error) {
        console.error("Erro ao exibir classificacoes:", error);
    }
}


// Função para confirmar a exclusão de um classificacao
function confirmarExclusao(idClassificacao) {
    if (confirm("Tem certeza que deseja continuar? Isto apagará a classificação para sempre!")) {
        excluirClassificacao(idClassificacao);
    } else {
        // Nenhuma ação necessária, o usuário optou por não excluir o filme
    }
}

// Função para excluir um filme
async function excluirClassificacao(idClassificacao) {
    try {
        const url = `http://localhost:8080/v2/acmefilmes/classificacao/${idClassificacao}`;
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
            exibirClassificacoes();
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
window.onload = exibirClassificacoes;
