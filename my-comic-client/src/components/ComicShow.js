import React from 'react'
import { Link } from 'react-router-dom'

function ComicShow(props){
  if (!props.comic){
    return null
  }

  return(
    <div>
      <h1>{props.comic.title}</h1>
      <img src={props.comic.panels[0].canvas_url} /><br/>
      <Link to={`/comics/${props.comic.id}/edit`}><button>Edit Comic</button></Link>
    </div>
  )
}

export default ComicShow
