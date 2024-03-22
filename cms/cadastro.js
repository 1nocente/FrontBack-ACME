// Função para enviar o filme para o servidor quando o formulário for submetido
import { postFilme } from '../filmes.js';



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
        "valor_unitario": valor
    };

    const cadastrado = await postFilme(filme);

    if (cadastrado) {
        alert("Filme cadastrado com sucesso!");
    } else {
        alert("Erro ao cadastrar filme. Por favor, tente novamente mais tarde.");
    }
}

// Adiciona um listener de evento para o botão "CADASTRAR FILME"
document.getElementById('cadastrarButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    enviarFilme(); // Chama a função para enviar o filme
});
