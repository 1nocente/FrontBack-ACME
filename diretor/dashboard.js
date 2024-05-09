import { getDiretores } from "../diretores.js";

// Função para contar e exibir o número de filmes cadastrados
async function contarDiretores() {
    try {
        const diretores = await getDiretores(); // Obter a lista de filmes
        const contador = document.getElementById('contador-diretores'); // Selecionar o elemento onde o contador será exibido

        if (diretores.length === 1) {
            contador.textContent = `${diretores.length} filme cadastrado atualmente`;
        } else {
            contador.textContent = `${diretores.length} diretores cadastrados atualmente`;
        }
    } catch (error) {
        console.error("Erro ao contar diretores:", error);
    }
}

// Função para recarregar a página
function recarregarPagina() {
    window.location.reload();
}

// Função para criar e exibir os detalhes de cada filme
async function exibirDiretores() {
    try {
        await contarDiretores(); // Contar e exibir o número de filmes cadastrados
        const diretores = await getDiretores(); // Obter a lista de filmes

        const informacoesDiv = document.getElementById('informações'); // Selecionar a div onde as informações dos filmes serão exibidas
        informacoesDiv.innerHTML = ''; // Limpar o conteúdo antes de adicionar os filmes novamente

        diretores.forEach(diretor => {
            // Criar uma div para cada filme
            const diretorDiv = document.createElement('div');
            diretorDiv.classList.add('flex', 'flex-row', 'h-16', 'border', 'solid', 'border-b-2', 'items-center', 'border-black', 'px-20');

            // ID
            const idSpan = document.createElement('span');
            idSpan.classList.add('min-w-20', 'text-center', 'mr-20');
            idSpan.textContent = diretor.id;
            diretorDiv.appendChild(idSpan);

            // Nome
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            nomeSpan.textContent = diretor.nome;
            diretorDiv.appendChild(nomeSpan);

            // Data Nascimento
            const dataNascimentoSpan = document.createElement('span');
            dataNascimentoSpan.classList.add('min-w-60', 'text-center', 'mr-20');
            dataNascimentoSpan.textContent = validarData(diretor.data_nascimento);
            diretorDiv.appendChild(dataNascimentoSpan);

            // Foto
            const diretorImg = document.createElement('img');
            diretorImg.classList.add('h-full', 'w-16', 'text-center', 'ml-40');
            diretorImg.src = diretor.foto; // Define o src da imagem como a URL do ícone
            diretorImg.alt = diretor.biografia; // Define um texto alternativo para acessibilidade
            diretorDiv.appendChild(diretorImg);

            // Nacionalidae
            const nascionalidadeSpan = document.createElement('span');
            nascionalidadeSpan.classList.add('min-w-96', 'text-center', 'mr-20');
            nascionalidadeSpan.textContent = diretor.nacionalidades;
            diretorDiv.appendChild(nascionalidadeSpan);

            // Lixeira
            const lixeiraImg = document.createElement('img');
            lixeiraImg.classList.add('h-full', 'w-16');
            lixeiraImg.src = '../src/styles/img/lixo.png';
            lixeiraImg.style.marginLeft = '0vw';
            lixeiraImg.style.cursor = 'pointer';
            lixeiraImg.addEventListener('click', () => confirmarExclusao(diretor.id));
            diretorDiv.appendChild(lixeiraImg);

            // Adicionar a div do diretor à div de informações
            informacoesDiv.appendChild(diretorDiv);
        });

        // Adicionar um evento de rolagem à div de informações
        informacoesDiv.style.overflowY = 'scroll';
        informacoesDiv.style.maxHeight = 'calc(100vh - 250px)'; // Altura máxima para manter espaço para o cabeçalho e o rodapé
    } catch (error) {
        console.error("Erro ao exibir diretores:", error);
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
function confirmarExclusao(idDiretor) {
    if (confirm("Tem certeza que deseja continuar? Isto apagará o diretor para sempre!")) {
        excluirDiretor(idDiretor);
    } else {
        // Nenhuma ação necessária, o usuário optou por não excluir o diretor
    }
}

// Função para excluir um diretor
async function excluirDiretor(idDiretor) {
    try {
        const url = `http://localhost:8080/v2/acmefilmes/diretor/${idDiretor}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Se necessário, adicione quaisquer headers de autenticação aqui
            }
        });
        const data = await response.json();

        if (response.ok) {
            alert("Deu tudo certo campeão vai lá"); // Exibir mensagem de sucesso
            // Atualizar a lista de filmes após a exclusão (opcional)
            exibirDiretores();
            recarregarPagina();
        } else {
            alert(data.message); // Exibir mensagem de erro
        }
    } catch (error) {
        console.error("Erro ao excluir diretor:", error);
        alert("Erro ao excluir diretor. Por favor, tente novamente mais tarde.");
    }
}

// Chamar a função para exibir os filmes quando a página carregar
window.onload = exibirDiretores;
