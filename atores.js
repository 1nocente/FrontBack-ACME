export async function getAtores(){
    const url = 'http://localhost:8080/v2/acmeFilmes/atores'
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function postAtor (ator) {
    const url = 'http://localhost:8080/v2/acmeFilmes/ator'
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (ator)
    }

    const response = await fetch(url, options)

    return response.ok
}

