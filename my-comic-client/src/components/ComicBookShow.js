import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, Image } from 'semantic-ui-react'

function ComicBookShow(props){
  let comicEls = []
  
  if (props.comicBook){
    comicEls = props.comicBook.comics.map(comic =>
      <div><Image src={comic.canvas_url} /><br/></div>
    )
  }

  if (!props.comicBook){
    return null
  }

  return(
    <div>
      <h1 className="title-font">{props.comicBook.title}</h1>
      {comicEls}
    </div>
  )
}

export default ComicBookShow

{/* <Grid>
  <Grid.Row centered>
    <Grid.Column width={12} textAlign='center'>
      <br/>
      <h1 className="title-font">{props.comicBook.title}</h1>
    </Grid.Column>
  </Grid.Row>

  <Grid.Row centered>
    <Grid.Column width={12}>
      <img src={props.comic.canvas_url} alt="" /><br/>
    </Grid.Column>
  </Grid.Row>
  <Grid.Row centered>
    <Grid.Column  width={12}>
      <Link to={`/comics/${props.comic.id}/edit`}><Button content='Edit Comic' color='blue' /></Link>
    </Grid.Column>
  </Grid.Row>
</Grid> */}
