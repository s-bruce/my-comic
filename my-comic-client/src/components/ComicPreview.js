import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

function ComicPreview(props){
  return(
    <Link to={`/comics/${props.comic.id}`}><Image src={props.comic.canvas_url} size='large' floated='left' /></Link>
  )
}

export default ComicPreview

// try using Image component from semantic-ui-react
