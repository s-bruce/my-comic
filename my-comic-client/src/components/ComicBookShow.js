import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Grid, Button, Image, Dropdown } from 'semantic-ui-react'

class ComicBookShow extends React.Component {
  constructor(){
    super()

    this.state = {
      currentIndex: 0
    }

    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.handleEditComic = this.handleEditComic.bind(this)
  }

  componentDidMount(){
    window.scrollTo(0,0)
  }

  previousPage(){
    const currentIndex = this.state.currentIndex - 1
    this.setState({currentIndex: currentIndex})
    window.scrollTo(0, 0)
  }

  nextPage(){
    const currentIndex = this.state.currentIndex + 1
    this.setState({currentIndex: currentIndex})
    window.scrollTo(0, 0)
  }

  handleEditComic(){
    const comicBookId = this.props.comicBook.id
    const comicId = this.props.comicBook.comics[this.state.currentIndex].id

    this.props.history.push(`/comics/${comicBookId}/edit/${comicId}`)
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

    const editOptions = [
      { key: 'editPage', icon: 'edit', text: 'Edit Page', value: 'editPage', onClick: this.handleEditComic },
      // { key: 'deletePage', icon: 'delete', text: 'Delete Page', value: 'deletePage' },
      { key: 'editTitle', icon: 'edit', text: 'Edit Title', value: 'editTitle' },
      // { key: 'deleteBook', icon: 'delete', text: 'Delete Comic Book', value: 'deleteBook' },
    ]

    if (!this.props.comicBook){
      return null
    }

    return(
      <div>
        <h1 className="title-font">{this.props.comicBook.title}</h1>

        <Button.Group color='yellow'>
          <Dropdown text='Edit' options={editOptions} floating button />
        </Button.Group>

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


export default withRouter(ComicBookShow)

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
