import React from 'react'
import { Grid, Divider, Card, Dimmer, Loader } from 'semantic-ui-react'

import ComicPreview from './ComicPreview'

class Comics extends React.Component{

  componentDidMount(){
    console.log("mounting. props: ",this.props);
  }

  componentWillReceiveProps(props){
    console.log("receiving props: ",props);
  }

  render(){
    const comicEls = this.props.userComics.map((comicBook, i) =>
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

        {comicEls.length === 0 ? (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ): (
          <div>
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
        )}


      </div>
    )
  }
}

export default Comics
