import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, Image } from 'semantic-ui-react'

class ComicBookShow extends React.Component {
  constructor(){
    super()

    this.state = {
      currentIndex: 0
    }

    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  previousPage(){
    const currentIndex = this.state.currentIndex - 1
    this.setState({currentIndex: currentIndex})
  }

  nextPage(){
    const currentIndex = this.state.currentIndex + 1
    this.setState({currentIndex: currentIndex})
  }

  render(){
    let comicEls = []
    let lastIndex = 0

    if (this.props.comicBook){
      comicEls = this.props.comicBook.comics.map(comic =>
        <div><Image src={comic.canvas_url} /><br/></div>
      )

      lastIndex = this.props.comicBook.comics.length - 1
    }

    if (!this.props.comicBook){
      return null
    }

    return(
      // {comicEls}
      <div>
        <h1 className="title-font">{this.props.comicBook.title}</h1>

        {comicEls[this.state.currentIndex]}

        {this.state.currentIndex > 0 ?
          <Button content='Previous Page' color='blue' floated='left' onClick={this.previousPage} />
          : null
        }

        {this.state.currentIndex != lastIndex ?
          <Button content='Next Page' color='blue' floated='right' onClick={this.nextPage} />
          : null
        }
      </div>
    )
  }

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
