const API_HOST = 'https://api.frankfurter.app'

export async function fetchCurrencies(){
    const res = await fetch(`${API_HOST}/2022-09-10..?from=USD&to=EUR`)
    const data = await res.json()

    console.log(data)

    return data
}

export async function fetchAllCurrenciesName(){
    const res = await fetch(`${API_HOST}/currencies`)
    const data = await res.json()

    return data
}