export async function getSexos() {
    try {
        const response = await fetch('http://localhost:8080/v2/acmeFilmes/sexo');
        const data = await response.json();
        return data; // Retorna os dados de sexos
    } catch (error) {
        console.error('Erro ao obter sexos:', error);
        return []; // Retorna uma array vazia em caso de erro
    }
}

