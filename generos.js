export async function getGeneros(){
    const url = 'http://localhost:8080/v2/AcmeFilmes/generos'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function postGenero (genero) {
    const url = 'http://localhost:8080/v2/acmeFilmes/genero'
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (genero)
    }

    const response = await fetch(url, options)

    return response.ok
}