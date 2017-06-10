export function fetchComics(){
  return fetch("http://localhost:3000/api/v1/comics")
    .then(res => res.json())
}

export function createComic(comic){
  return fetch("http://localhost:3000/api/v1/comics", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(comic)
  }).then(res => res.json())
}

export function updateComic(comic){
  return fetch(`http://localhost:3000/api/v1/comics/${comic.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comic)
  }).then( res => res.json() )
}
