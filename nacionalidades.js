export async function getNacionalidades() {
    try {
        const response = await fetch('http://localhost:8080/v2/acmeFilmes/nacionalidades');
        const data = await response.json();
        return data; // Retorna os dados de nacionalidades
    } catch (error) {
        console.error('Erro ao obter nacionalidades:', error);
        return []; // Retorna uma array vazia em caso de erro
    }
}