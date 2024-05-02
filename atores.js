export async function getAtores(){
    const url = 'http://localhost:8080/v2/acmeFilmes/atores'
    const response = await fetch(url)
    const data = await response.json()

    return data
}