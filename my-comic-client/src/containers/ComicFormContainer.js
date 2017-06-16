import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import FormWelcome from '../components/FormWelcome'
import ComicCreateForm1 from '../components/ComicCreateForm1'
import ComicCreateForm2 from '../components/ComicCreateForm2'

class ComicFormContainer extends React.Component {
  constructor(){
    super()

    this.state = {
      comics: [],
      title: ''
    }

    this.handleGetStarted = this.handleGetStarted.bind(this)
    this.handleAddComic = this.handleAddComic.bind(this)
    this.handleCreateComicBook = this.handleCreateComicBook.bind(this)
  }

  handleGetStarted(params){
    this.setState({title: params.title})
    if (params.firstPage === 'one'){
      this.props.history.push('/comics/new/1')
    } else {
      this.props.history.push('/comics/new/2')
    }
  }

  handleAddComic(comic){
    this.setState(prevState => ({ comics: [...prevState.comics, comic] }) )
  }

  handleCreateComicBook(){
    let comics_attributes = {}
    this.state.comics.forEach((comic, i) => {
      comics_attributes[i.toString()] = comic
    })

    const comic_book = {
      comic_book: {
        title: this.state.title,
        account_id: this.props.user.id,
        comics_attributes: comics_attributes
      }
    }

    this.props.onCreate(comic_book)
  }

  render(){
    console.log("Form container state: ", this.state);
    return(
      <div>
        <Switch>
          <Route path="/comics/new/1" render={()=> <ComicCreateForm1 onCreateComic={this.handleAddComic} onCreateComicBook={this.handleCreateComicBook} />} />
          <Route path="/comics/new/2" render={()=> <ComicCreateForm2 onCreateComic={this.handleAddComic} onCreateComicBook={this.handleCreateComicBook} />} />
          <Route exact path="/comics/new" render={()=> <FormWelcome onGetStarted={this.handleGetStarted}/>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(ComicFormContainer)
