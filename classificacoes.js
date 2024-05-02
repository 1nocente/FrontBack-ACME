export async function getClassificacoes(){
    const url = 'http://localhost:8080/v2/AcmeFilmes/classificacoes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}