export function signUp(params){
  return fetch("http://localhost:3000/api/v1/accounts", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({account: params})
  }).then(res => res.json())
}

export function logIn(params){
  return fetch("http://localhost:3000/api/v1/auth", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  }).then(res => res.json())
}

export function fetchCurrentUser(){
  return fetch("http://localhost:3000/api/v1/auth", {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  })
    .then(res => res.json())
}

export function fetchComics(){
  return fetch("http://localhost:3000/api/v1/comic_books", {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  })
    .then(res => res.json())
}

export function fetchUserComics(id){
  return fetch(`http://localhost:3000/api/v1/usercomics/${id}`, {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  })
    .then(res => res.json())
}

export function createComicBook(comic){
  return fetch("http://localhost:3000/api/v1/comic_books", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'POST',
    body: JSON.stringify(comic)
  }).then(res => res.json())
}

export function updateComic(id, comic){
  return fetch(`http://localhost:3000/api/v1/comic_books/${id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'PATCH',
    body: JSON.stringify(comic)
  }).then( res => res.json() )
}
