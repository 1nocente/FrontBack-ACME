export async function getClassificacoes(){
    const url = 'http://localhost:8080/v2/AcmeFilmes/classificacoes'
    const response = await fetch(url)
    const data = await response.json()

    return data.classificacoes
}

export async function postClassificacao (classificacao) {
    const url = 'http://localhost:8080/v2/acmeFilmes/classificacao'
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (classificacao)
    }

    const response = await fetch(url, options)

    return response.ok
}