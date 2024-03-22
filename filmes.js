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

