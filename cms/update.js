let classificacaoSelecionada; // Declaração da variável classificacaoSelecionada

// JavaScript para preencher os campos com as informações do filme selecionado
// e lidar com a atualização do filme
import { getFilmes, putFilme } from '../filmes.js'; // Importa as funções necessárias
import { getClassificacoes } from '../classificacoes.js';

let filmeAtualizado; // Declaração da variável filmeAtualizado

// Função para carregar os IDs dos filmes e preencher o select
async function carregarIDsFilmes() {
    const filmes = await getFilmes(); // Obtém a lista de filmes com seus IDs

    // Popula o select com os IDs dos filmes
    const selectIDFilme = document.getElementById('idFilme');
    filmes.forEach(filme => {
        const option = document.createElement('option');
        option.value = filme.id;
        option.textContent = filme.id;
        selectIDFilme.appendChild(option);
    });

    // Adiciona um evento de mudança ao select para preencher os campos com as informações do filme selecionado
    selectIDFilme.addEventListener('change', async function() {
        const idSelecionado = selectIDFilme.value;
        const filmeSelecionado = filmes.find(filme => filme.id == idSelecionado);
        preencherCampos(filmeSelecionado);
    });
}

// Função para preencher os campos com as informações do filme selecionado
function preencherCampos(filme) {
    document.getElementById('nomeFilme').value = filme.nome;
    document.getElementById('sinopse').value = filme.sinopse;
    document.getElementById('midiaFilme').value = filme.foto_capa;
    document.getElementById('dataLancamento').value = filme.data_lancamento;

    // Extrai apenas o tempo da duração do filme
    const duracaoSemData = new Date(filme.duracao).toISOString().substr(11, 8);
    document.getElementById('duracao').value = duracaoSemData;

    document.getElementById('valor').value = filme.valor_unitario;
    document.getElementById('classificacao').value = filme.id_classificacao;

    // Atualiza a variável filmeAtualizado
    filmeAtualizado = filme;
}

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#duracao", {
        enableTime: true, // Permite que o usuário selecione a hora
        noCalendar: true, // Remove o calendário
        dateFormat: "H:i:S", // Formato da hora (hora:minuto)
        time_24hr: true // Usa o formato de 24 horas
    });
});


document.getElementById('atualizarButton').addEventListener('click', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém o ID do filme selecionado
    const idFilme = document.getElementById('idFilme').value;

    // Obtém os valores dos campos do formulário para atualizar o filme
    const nomeFilme = document.getElementById('nomeFilme').value;
    const sinopse = document.getElementById('sinopse').value;
    const midiaFilme = document.getElementById('midiaFilme').value;
    const dataLancamento = document.getElementById('dataLancamento').value;
    const duracao = document.getElementById('duracao').value;
    const valor = document.getElementById('valor').value;
    const classificacao = document.getElementById('classificacao').value;

    // Verifica se todos os campos estão preenchidos
    if (!idFilme || !nomeFilme || !sinopse || !midiaFilme || !dataLancamento || !duracao || !valor || !classificacao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria o objeto filme com os dados atualizados
    const filmeAtualizado = {
        id: idFilme,
        nome: nomeFilme,
        sinopse: sinopse,
        foto_capa: midiaFilme,
        data_lancamento: dataLancamento,
        duracao: duracao,
        valor_unitario: valor,
        id_classificacao: classificacao
    };

    // Chama a função para atualizar o filme
    const atualizado = await putFilme(idFilme, filmeAtualizado);

    if (atualizado) {
        alert("Filme atualizado com sucesso!");
        // Redireciona para a tela anterior após a atualização
        window.location.href = './dashboard.html';
    } else {
        alert("Erro ao atualizar o filme. Por favor, tente novamente mais tarde.");
    }
});

// Função para carregar as classificações e preencher o select
async function carregarClassificacoes() {
    const classificacoes = await getClassificacoes(); // Obtém a lista de classificações

    // Popula o select de classificações
    const selectClassificacao = document.getElementById('classificacao');
    classificacoes.forEach(classificacao => {
        const option = document.createElement('option');
        option.value = classificacao.id; // Use o ID da classificação como valor
        option.textContent = classificacao.classificacao;
        selectClassificacao.appendChild(option);
    });
}

// Função para selecionar a classificação
function selecionarClassificacao() {
    const selectClassificacao = document.getElementById('classificacao');
    classificacaoSelecionada = selectClassificacao.value;

    // Atualiza o JSON com a classificação selecionada
}

// Adiciona um evento de mudança ao select de classificação
document.getElementById('classificacao').addEventListener('change', selecionarClassificacao);

// Chama a função para carregar as classificações quando a página carrega
document.addEventListener('DOMContentLoaded', carregarClassificacoes);

// Chama a função para carregar os IDs dos filmes quando a página carrega
document.addEventListener('DOMContentLoaded', carregarIDsFilmes);
