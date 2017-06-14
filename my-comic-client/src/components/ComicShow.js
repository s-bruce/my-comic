import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'

function ComicShow(props){
  if (!props.comic){
    return null
  }

  return(
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={12} textAlign='center'>
          <br/>
          <h1 className="title-font">{props.comic.title}</h1>
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
    </Grid>

  )
}

export default ComicShow
