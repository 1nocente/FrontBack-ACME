export async function getDiretores(){
    const url = 'http://localhost:8080/v2/acmeFilmes/diretores'
    const response = await fetch(url)
    const data = await response.json()

    return data
}