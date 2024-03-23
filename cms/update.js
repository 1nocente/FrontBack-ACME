// Função para enviar os dados do filme para o servidor quando o formulário for submetido
import { putFilme } from '../filmes.js';

// Função para capturar os dados do filme do formulário e enviar para o servidor
async function atualizarFilme() {
    const idFilme = document.getElementById('idFilme').value; // Captura o ID do filme
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

    const atualizado = await putFilme(idFilme, filme); // Chama a função para enviar os dados atualizados do filme

    if (atualizado) {
        alert("Filme atualizado com sucesso!"); // Exibe uma mensagem de sucesso em um modal
        console.log("Filme atualizado:", filme); // Exibe os dados atualizados do filme no console
    } else {
        alert("Erro ao atualizar filme. Por favor, tente novamente mais tarde."); // Exibe uma mensagem de erro em um modal
    }
}

// Adiciona um listener de evento para o botão "ATUALIZAR FILME"
document.getElementById('cadastrarButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    atualizarFilme(); // Chama a função para atualizar o filme
});
