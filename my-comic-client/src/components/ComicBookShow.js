import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Divider, Segment, Button, Image, Dropdown, Header, Icon, Menu } from 'semantic-ui-react'

class ComicBookShow extends React.Component {
  constructor(){
    super()

    this.state = {
      currentIndex: 0
    }

    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.handleEditComic = this.handleEditComic.bind(this)
    this.handleEditTitle = this.handleEditTitle.bind(this)
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

  handleEditTitle(){
    const comicBookId = this.props.comicBook.id
    this.props.history.push(`/comics/${comicBookId}/edit/title`)
  }

  render(){
    let comicEls = []
    let lastIndex = 0
    let download = ""

    const trigger = (
      <span>
        <Icon name='setting' size='large' />
      </span>
    )


    if (this.props.comicBook){
      comicEls = this.props.comicBook.comics.map(comic =>
        <Image src={comic.canvas_url} bordered centered />
      )

      lastIndex = this.props.comicBook.comics.length - 1

      download = this.props.comicBook.title + " p." + (this.state.currentIndex + 1)
    }

    if (!this.props.comicBook){
      return null
    }

    return(
      <div>
        <Divider hidden />

        <Grid>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              <Segment raised textAlign='center'>
                <h1 className='title-font'>{this.props.comicBook.title}</h1>
                {comicEls[this.state.currentIndex]}
                <br />
                {this.state.currentIndex + 1}
              </Segment>
            </Grid.Column>
            <Grid.Column width={2}>
              <Dropdown trigger={trigger} floating labeled button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item text='Edit Page' onClick={this.handleEditComic} />
                  <Dropdown.Item text='Edit Title' onClick={this.handleEditTitle} />
                  <Dropdown.Item><a href={this.props.comicBook.comics[this.state.currentIndex].canvas_url} download={download}>Download Page</a></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Header as='h4'>
                <Icon name='edit' />
                <Header.Content>
                  Edit
                </Header.Content>
                <Dropdown inline>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Edit Page' onClick={this.handleEditComic} />
                    <Dropdown.Item text='Edit Title' onClick={this.handleEditTitle} />
                  </Dropdown.Menu>
                </Dropdown>
              </Header> */}
              {/* <a href={this.props.comicBook.comics[this.state.currentIndex].canvas_url} download="MyComic.png">
                <Button>
                  Download Page <Icon name='download' />
                </Button>
              </a> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column floated='left' width={4}>
              {this.state.currentIndex > 0 ?
                <Button content='Previous Page' color='blue' floated='left' onClick={this.previousPage} />
                : null
              }
            </Grid.Column>
            <Grid.Column floated='right' width={4}>
              {this.state.currentIndex !== lastIndex ?
                <Button content='Next Page' color='blue' floated='right' onClick={this.nextPage} />
                : null
              }
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}


export default withRouter(ComicBookShow)
