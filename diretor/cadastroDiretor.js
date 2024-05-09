// Função para enviar o filme para o servidor quando o formulário for submetido
import { getNacionalidades } from '../nacionalidades.js';
import { getSexos } from '../sexos.js';
import { postDiretores } from '../diretores.js';


async function carregarSexosENacionalidades() {
    const sexos = await getSexos(); // Obtém a lista de Sexos
    console.log(sexos)
    const nacionalidades = await getNacionalidades(); // Obtém a lista de Nacionalidades

    // Popula o select de Sexos
    const selectSexos = document.getElementById('sexos');
    sexos.filmes.forEach(sexos => {
        const option = document.createElement('option');
        option.value = sexos.id; // Use o ID do sexos como valor
        option.textContent = sexos.nome;
        selectSexos.appendChild(option);

        // Adiciona evento de clique para selecionar/atualizar o sexos
        option.addEventListener('click', function(event) {
            selecionarSexo(option);
        });
    });

    // Popula o select de Nacionalidades
    const selectNacionalidades = document.getElementById('nacionalidades');
    nacionalidades.filmes.forEach(nacionalidades => {
        const option = document.createElement('option');
        option.value = nacionalidades.id; // Use o ID do nacionalidades como valor
        option.textContent = nacionalidades.nome;
        selectNacionalidades.appendChild(option);

        // Adiciona evento de clique para selecionar/atualizar o nacionalidades
        option.addEventListener('click', function(event) {
            selecionarNacionalidade(option);
        });
    });
}


let sexosSelecionados = [];
let nacionalidadesSelecionados = [];


function selecionarSexo(option) {
    const sexoId = option.value;

    // Verifica se o Sexo já está selecionado
    const index = sexosSelecionados.indexOf(sexoId);
    if (index !== -1) {
        // Remove a seleção se já estiver selecionado
        sexosSelecionados.splice(index, 1);
        option.style.backgroundColor = ''; // Remove a cor de fundo
    } else {
        // Adiciona o Sexo aos selecionados
        sexosSelecionados.push(sexoId);
        option.style.backgroundColor = 'lightblue'; // Define uma cor de fundo para indicar seleção
    }

    // Atualiza o JSON com os Sexos selecionados
    atualizarJson();
}

function selecionarNacionalidade(option) {
    const nacionalidadeId = option.value;

    // Verifica se o Nacionalidade já está selecionado
    const index = nacionalidadesSelecionados.indexOf(nacionalidadeId);
    if (index !== -1) {
        // Remove a seleção se já estiver selecionado
        nacionalidadesSelecionados.splice(index, 1);
        option.style.backgroundColor = ''; // Remove a cor de fundo
    } else {
        // Adiciona o Nacionalidade aos selecionados
        nacionalidadesSelecionados.push(nacionalidadeId);
        option.style.backgroundColor = 'lightblue'; // Define uma cor de fundo para indicar seleção
    }

    // Atualiza o JSON com os Nacionalidades selecionados
    atualizarJson();
}




function atualizarJson() {
    const nomeDiretor = document.getElementById('nomeDiretor').value;
    const biografia = document.getElementById('biografia').value;
    const dataNasc = document.getElementById('dataNasc').value;

    const diretor = {
        "nome": nomeDiretor,
        "biografia": biografia,
        "data_nascimento": dataNasc,
        "nascionalidade": nacionalidadesSelecionados,
        "id_sexo": sexosSelecionados
    };

    console.log(diretor); // Exibe o objeto filme no console para depuração
}

async function enviarDiretor() {
   const nomeDiretor = document.getElementById('nomeDiretor').value;
    const biografia = document.getElementById('biografia').value;
    const dataNasc = document.getElementById('dataNasc').value;

    const diretor = {
        "nome": nomeDiretor,
        "biografia": biografia,
        "data_nascimento": dataNasc,
        "nacionalidade": nacionalidadesSelecionados,
        "id_sexo": sexosSelecionados
    };

    console.log(diretor);

    const cadastrado = await postDiretores(diretor);

    if (cadastrado) {
        alert("diretor cadastrado com sucesso!");
    } else {
        alert("Erro ao cadastrar diretor. Por favor, tente novamente mais tarde.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregarSexosENacionalidades(); // Chama a função para carregar Sexos e Nacionalidades quando a página carrega
});


document.getElementById('cadastrarButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    enviarDiretor(); // Chama a função para enviar o filme
});