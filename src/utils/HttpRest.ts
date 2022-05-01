import fetch from "node-fetch"

export default async function HttpRest (url: string, init?: any) {
  return await fetch(url, {
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(init?.body),
    ...init
  })
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json()
      }
      throw new Error('Falha em pegar os dados do servidor :(')
    })
}