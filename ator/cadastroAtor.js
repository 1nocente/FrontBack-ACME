// Função para enviar o filme para o servidor quando o formulário for submetido
import { postAtores } from '../atores.js';
import { getNascionalidades } from '../nascionalidades.js';
import { getSexos } from '../sexos.js';



async function carregarSexoENascionalidades() {
    const nascionalidades = await getNascionalidades(); // Obtém a lista de atores
    const sexos = await getSexos(); // Obtém a lista de diretores

    // Popula o select de atores
    const selectNascionalidades = document.getElementById('nascionalidades');
    nascionalidades.forEach(nascionalidade => {
        const option = document.createElement('option');
        option.value = nascionalidade.id; // Use o ID do ator como valor
        option.textContent = nascionalidade.nome;
        selectNascionalidades.appendChild(option);

        // Adiciona evento de clique para selecionar/atualizar o ator
        option.addEventListener('click', function(event) {
            selecionarAtor(option);
        });
    });

    // Popula o select de diretores
    const selectSexos = document.getElementById('sexos');
    sexos.forEach(sexo => {
        const option = document.createElement('option');
        option.value = sexo.id; // Use o ID do diretor como valor
        option.textContent = sexo.nome;
        selectSexos.appendChild(option);

        // Adiciona evento de clique para selecionar/atualizar o diretor
        option.addEventListener('click', function(event) {
            selecionarSexo(option);
        });
    });
}


let sexosSelecionados = [];
let nascionalidadesSelecionadas = [];


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
    carregarSexoENascionalidades(); // Chama a função para carregar atores e diretores quando a página carrega
    carregarClassificacoes(); // Chama a função para carregar as classificações quando a página carrega
});

document.getElementById('classificacao').addEventListener('change', selecionarClassificacao);

document.getElementById('cadastrarButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    enviarFilme(); // Chama a função para enviar o filme
});