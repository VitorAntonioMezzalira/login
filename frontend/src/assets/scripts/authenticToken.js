async function authenticToken() {

  const data = {
    token: getCookie('token')
  }

  const response =  await fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(data)
  })

  return response.json()

}