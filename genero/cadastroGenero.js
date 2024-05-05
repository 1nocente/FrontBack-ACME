// Função para enviar a classificação para o servidor quando o formulário for submetido
import { postGenero } from '../generos.js';

async function enviarGenero() {
    const nome = document.getElementById('nome').value;

    const generoData = {
        "nome": nome
    };

    console.log(generoData);
    const cadastrado = await postGenero(generoData);

    if (cadastrado) {
        alert("Genero cadastrado com sucesso!");
    } else {
        alert("Erro ao cadastrar genero. Por favor, tente novamente mais tarde.");
    }
}

// Adiciona um listener de evento para o botão "CADASTRAR CLASSIFICAÇÃO"
document.getElementById('cadastrarGeneroButton').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    enviarGenero(); // Chama a função para enviar a classificação
});
