import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Divider, Card, Loader } from 'semantic-ui-react'

import ComicPreview from './ComicPreview'

function Comics(props){
  const comicEls = props.userComics.map((comicBook, i) =>
    <ComicPreview comicBook={comicBook} key={i} />
  )

  return(
    <div>
      <Divider hidden />
      <Grid textAlign='center'>
        <Grid.Row>
          <h1 className='title-font'>{props.user.username}'s Comics</h1>
        </Grid.Row>
      </Grid>
      <Divider hidden />
      <Divider />
      <Divider hidden />

      {props.fetchingComics ? (
        <Loader active>Loading</Loader>
      ) : (
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={13}>
              <Card.Group>
                {comicEls}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}

      {!props.fetchingComics && props.userComics.length === 0 ? (
        <Grid textAlign='center'>
          <Grid.Row>
            <h3>It looks like you haven't created any comics! <Link to={'/comics/new'}>Click here</Link> if you'd like to create a comic.</h3>
          </Grid.Row>
        </Grid>
      ) : null }
    </div>
  )
}

export default Comics
