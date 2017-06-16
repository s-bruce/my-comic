import React from 'react'
import { Card } from 'semantic-ui-react'

import ComicPreview from './ComicPreview'

function Comics(props){
  const comicEls = props.userComics.map(comicBook =>
    <ComicPreview comicBook={comicBook} />
  )

  return(
    <div>
      <h1>My Comics</h1><br/>
      <Card.Group>
        {comicEls}
      </Card.Group>
    </div>
  )
}

export default Comics
