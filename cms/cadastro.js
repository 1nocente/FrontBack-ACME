// Função para enviar o filme para o servidor quando o formulário for submetido
import { postFilme } from '../filmes.js';
import { getAtores } from '../atores.js';
import { getDiretores } from '../diretores.js';
import { getClassificacoes } from '../classificacoes.js';
import { getGeneros } from '../generos.js'; // Importa a função getGeneros do arquivo generos.js




async function carregarGeneros() {
    const generos = await getGeneros(); // Obtém os gêneros usando a função getGeneros

    // Popula o select de gêneros
    const selectGeneros = document.getElementById('generos');
    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero.id; // Use o ID do gênero como valor
        option.textContent = genero.nome;
        selectGeneros.appendChild(option);
    });
}

let generosSelecionados = [];

// Função para selecionar os gêneros
// Função para selecionar os gêneros
function selecionarGenero() {
    const selectGeneros = document.getElementById('generos');
    generosSelecionados = Array.from(selectGeneros.selectedOptions).map(option => option.value);

    // Atualiza o JSON com os gêneros selecionados
    atualizarJson();

    // Loop pelos options do select de gêneros para aplicar estilo
    Array.from(selectGeneros.options).forEach(option => {
        if (generosSelecionados.includes(option.value)) {
            option.style.backgroundColor = 'lightblue'; // Define a cor de fundo para gêneros selecionados
        } else {
            option.style.backgroundColor = ''; // Remove a cor de fundo para gêneros não selecionados
        }
    });
}

// Adiciona um evento de mudança ao select de gêneros
document.getElementById('generos').addEventListener('change', selecionarGenero);

// Chama a função para carregar os gêneros quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    carregarGeneros();
});

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#duracao", {
        enableTime: true, // Permite que o usuário selecione a hora
        noCalendar: true, // Remove o calendário
        dateFormat: "H:i:S", // Formato da hora (hora:minuto:segundo)
        time_24hr: true // Usa o formato de 24 horas
    });
});







async function carregarAtoresEDiretores() {
    const atores = await getAtores(); // Obtém a lista de atores
    const diretores = await getDiretores(); // Obtém a lista de diretores

    // Popula o select de atores
    const selectAtores = document.getElementById('atores');
    atores.forEach(ator => {
        const option = document.createElement('option');
        option.value = ator.id; // Use o ID do ator como valor
        option.textContent = ator.nome;
        selectAtores.appendChild(option);

        // Adiciona evento de clique para selecionar/atualizar o ator
        option.addEventListener('click', function(event) {
            selecionarAtor(option);
        });
    });

    // Popula o select de diretores
    const selectDiretores = document.getElementById('diretores');
    diretores.forEach(diretor => {
        const option = document.createElement('option');
        option.value = diretor.id; // Use o ID do diretor como valor
        option.textContent = diretor.nome;
        selectDiretores.appendChild(option);

        // Adiciona evento de clique para selecionar/atualizar o diretor
        option.addEventListener('click', function(event) {
            selecionarDiretor(option);
        });
    });
}

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

let atoresSelecionados = [];
let diretoresSelecionados = [];
let classificacaoSelecionada = null;

// Função para selecionar a classificação
function selecionarClassificacao() {
    const selectClassificacao = document.getElementById('classificacao');
    console.log(selectClassificacao); // Verifique se o elemento está sendo encontrado corretamente
    classificacaoSelecionada = selectClassificacao.value;

    // Atualiza o JSON com a classificação selecionada
    atualizarJson();
}
function selecionarAtor(option) {
    const atorId = option.value;

    // Verifica se o ator já está selecionado
    const index = atoresSelecionados.indexOf(atorId);
    if (index !== -1) {
        // Remove a seleção se já estiver selecionado
        atoresSelecionados.splice(index, 1);
        option.style.backgroundColor = ''; // Remove a cor de fundo
    } else {
        // Adiciona o ator aos selecionados
        atoresSelecionados.push(atorId);
        option.style.backgroundColor = 'lightblue'; // Define uma cor de fundo para indicar seleção
    }

    // Atualiza o JSON com os atores selecionados
    atualizarJson();
}

function selecionarDiretor(option) {
    const diretorId = option.value;

    // Verifica se o diretor já está selecionado
    const index = diretoresSelecionados.indexOf(diretorId);
    if (index !== -1) {
        // Remove a seleção se já estiver selecionado
        diretoresSelecionados.splice(index, 1);
        option.style.backgroundColor = ''; // Remove a cor de fundo
    } else {
        // Adiciona o diretor aos selecionados
        diretoresSelecionados.push(diretorId);
        option.style.backgroundColor = 'lightblue'; // Define uma cor de fundo para indicar seleção
    }

    // Atualiza o JSON com os diretores selecionados
    atualizarJson();
}




function atualizarJson() {
    const nomeFilme = document.getElementById('nomeFilme').value;
    const sinopse = document.getElementById('sinopse').value;
    const duracao = document.getElementById('duracao').value;
    const dataLancamento = document.getElementById('dataLancamento').value;
    const dataRelancamento = document.getElementById('dataRelancamento').value;
    const midiaFilme = document.getElementById('midiaFilme').value;
    const valor = document.getElementById('valor').value;

    const filme = {
        "nome": nomeFilme,
        "sinopse": sinopse,
        "duracao": duracao,
        "data_lancamento": dataLancamento,
        "data_relancamento": dataRelancamento,
        "foto_capa": midiaFilme,
        "valor_unitario": valor,
        "id_classificacao": classificacaoSelecionada,
        "elenco": atoresSelecionados,
        "diretor": diretoresSelecionados,
        "genero": generosSelecionados
    };

    console.log(filme); // Exibe o objeto filme no console para depuração
}

async function enviarFilme() {
    const nomeFilme = document.getElementById('nomeFilme').value;
    const sinopse = document.getElementById('sinopse').value;
    const duracao = document.getElementById('duracao').value;
    const dataLancamento = document.getElementById('dataLancamento').value;
    const dataRelancamento = document.getElementById('dataRelancamento').value;
    const midiaFilme = document.getElementById('midiaFilme').value;
    const valor = document.getElementById('valor').value;

    const filme = {
        "nome": nomeFilme,
        "sinopse": sinopse,
        "duracao": duracao,
        "data_lancamento": dataLancamento,
        "data_relancamento": dataRelancamento,
        "foto_capa": midiaFilme,
        "valor_unitario": valor,
        "id_classificacao": classificacaoSelecionada,
        "elenco": atoresSelecionados,
        "diretor": diretoresSelecionados,
        "genero": generosSelecionados
    };

    console.log(filme);

    const cadastrado = await postFilme(filme);

    if (cadastrado) {
        alert("Filme cadastrado com sucesso!");
    } else {
        alert("Erro ao cadastrar filme. Por favor, tente novamente mais tarde.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregarAtoresEDiretores(); // Chama a função para carregar atores e diretores quando a página carrega
    carregarClassificacoes(); // Chama a função para carregar as classificações quando a página carrega
});

document.getElementById('classificacao').addEventListener('change', selecionarClassificacao);

document.getElementById('cadastrarButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    enviarFilme(); // Chama a função para enviar o filme
});