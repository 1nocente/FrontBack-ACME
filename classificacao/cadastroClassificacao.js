// Função para enviar a classificação para o servidor quando o formulário for submetido
import { postClassificacao } from '../classificacoes.js';

async function enviarClassificacao() {
    const faixaEtaria = document.getElementById('faixaEtaria').value;
    const classificacao = document.getElementById('classificacao').value;
    const caracteristica = document.getElementById('caracteristica').value;
    const icone = document.getElementById('icone').value;

    const classificacaoData = {
        "faixa_etaria": faixaEtaria,
        "classificacao": classificacao,
        "caracteristica": caracteristica,
        "icone": icone
    };

    console.log(classificacaoData);
    const cadastrado = await postClassificacao(classificacaoData);

    if (cadastrado) {
        alert("Classificação cadastrada com sucesso!");
    } else {
        alert("Erro ao cadastrar classificação. Por favor, tente novamente mais tarde.");
    }
}

// Adiciona um listener de evento para o botão "CADASTRAR CLASSIFICAÇÃO"
document.getElementById('cadastrarClassificacaoButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    enviarClassificacao(); // Chama a função para enviar a classificação
});
