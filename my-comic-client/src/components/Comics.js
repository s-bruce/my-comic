import React from 'react'
import { Image } from 'semantic-ui-react'

import ComicPreview from './ComicPreview'

function Comics(props){
  const comicEls = props.userComics.map(comic =>
    <ComicPreview comic={comic} />
  )

  return(
    <div>
      <h1>My Comics</h1><br/>
      {comicEls}
    </div>
  )
}

export default Comics
