import React from 'react'
import { Grid, Divider, Card } from 'semantic-ui-react'

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
          <h1 className='title-font'>My Comics</h1>
        </Grid.Row>
      </Grid>
      <Divider hidden />
      <Divider />

      <Divider hidden />
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={13}>
            <Card.Group>
              {comicEls}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>

      </Grid>

    </div>
  )
}

export default Comics
