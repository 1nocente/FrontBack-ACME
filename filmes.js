export async function getFilmes(){
    const url = 'http://localhost:8080/v2/AcmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function getImage(){
    const url = 'http://localhost:8080/v2/AcmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes.foto_capa
}

export async function postFilme (filme) {
    const url = 'http://localhost:8080/v2/acmeFilmes/filme'
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (filme)
    }

    const response = await fetch(url, options)

    return response.ok
}

export async function putFilme(idFilme, filme) {
    const url = `http://localhost:8080/v2/acmeFilmes/filme/${idFilme}`; // URL do endpoint de atualização do filme

    const options = {
        method: 'PUT', // Usando o método PUT para atualizar o filme
        headers: {
            'Content-Type': 'application/json' // Definindo o tipo de conteúdo como JSON
        },
        body: JSON.stringify(filme) // Convertendo o objeto filme para JSON e enviando no corpo da requisição
    };

    try {
        const response = await fetch(url, options); // Enviando a requisição PUT para o servidor
        return response.ok; // Retorna true se a requisição for bem-sucedida, caso contrário, retorna false
    } catch (error) {
        console.error('Erro ao atualizar filme:', error);
        return false; // Retorna false em caso de erro
    }
}
