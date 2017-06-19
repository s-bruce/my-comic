import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, Image } from 'semantic-ui-react'

function ComicPreview(props){
  let pages = props.comicBook.comics.length > 1 ? "Pages" : "Page"
  return(
    <Card>
      <Link to={`/comics/${props.comicBook.id}`}>
        <Image src={props.comicBook.comics[0].canvas_url} />
      </Link>
      <Card.Content>
        <h3 className="title-font">{props.comicBook.title}</h3>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{props.comicBook.comics.length} {pages}</Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default ComicPreview
