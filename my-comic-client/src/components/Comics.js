import React from 'react'
import { Card } from 'semantic-ui-react'

import ComicPreview from './ComicPreview'

function Comics(props){
  const comicEls = props.userComics.map((comicBook, i) =>
    <ComicPreview comicBook={comicBook} key={i} />
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
