export async function getDiretores(){
    const url = 'http://localhost:8080/v2/acmeFilmes/diretores'
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function postDiretores (diretor) {
    const url = 'http://localhost:8080/v2/acmefilmes/diretor'
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (diretor)
    }

    const response = await fetch(url, options)

    return response.ok
}