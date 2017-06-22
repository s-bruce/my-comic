import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { fetchComics, fetchUserComics, createComicBook, updateComicBook } from '../api'
import Welcome from '../components/Welcome'
import Comics from '../components/Comics'
import ComicFormContainer from './ComicFormContainer'
import ComicBookShow from '../components/ComicBookShow'
import ComicEditFormContainer from './ComicEditFormContainer'
import TitleEditForm from '../components/TitleEditForm'

class ComicsContainer extends React.Component{
  constructor(){
    super()

    this.state = {
      // comics: [],
      userComics: [],
      fetchingComics: false
    }

    this.handleCreateComicBook = this.handleCreateComicBook.bind(this)
    this.handleUpdateComicBook = this.handleUpdateComicBook.bind(this)
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
  }

  componentDidMount(){
    // fetchComics()
    // .then(comics => this.setState({comics: comics}))
    console.log("Container: componentDidMount. props: ",this.props);
  }

  componentWillReceiveProps(props){
    console.log("Container: componentWillReceiveProps. props: ",props);
    this.setState({fetchingComics: true})
    
    fetchUserComics(props.user.id)
    .then(comicBooks => {
      comicBooks.forEach(comicBook => {
        comicBook.comics.sort(function(a, b) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        })

      })

      comicBooks.sort(function(a, b) {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      })

      this.setState({userComics: comicBooks, fetchingComics: false})
    })
  }

  handleCreateComicBook(comic){
    createComicBook(comic)
    .then(com => {
      this.setState(prevState => ({ userComics: [...prevState.userComics, com]}))
      this.props.history.push(`/comics/${com.id}`)
    })
  }

  handleUpdateComicBook(id, comic){
    updateComicBook(id, comic)
    .then(com => {
      const sortedComics = com.comics.sort(function(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
      com.comics = sortedComics

      this.setState(prevState => {
        const updatedComics = prevState.userComics.map(c => {
          if (c.id === com.id){
            return com
          } else {
            return c
          }
        })
        return { userComics: updatedComics }
      })
    })
  }

  handleUpdateTitle(id, title){
    const comic_book = { id, title }
    updateComicBook(id, comic_book)
    .then(com => {
      const sortedComics = com.comics.sort(function(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
      com.comics = sortedComics

      this.setState(prevState => {
        const updatedComics = prevState.userComics.map(c => {
          if (c.id === com.id){
            return com
          } else {
            return c
          }
        })
        return { userComics: updatedComics }
      })
    })
  }

  render(){
    console.log("comics container state: ", this.state);
    return(
      <div>
        <Switch>
          <Route exact path="/comics" render={()=> <Comics userComics={this.state.userComics} fetchingComics={this.state.fetchingComics}/>} />
          <Route path="/comics/welcome" render={() => <Welcome user={this.props.user} />} />
          <Route path="/comics/new" render={()=> <ComicFormContainer user={this.props.user} onCreate={this.handleCreateComicBook}/>} />
          <Route exact path="/comics/:bookid/edit/title" render={({match}) => {
            const comicBook = this.state.userComics.find(comicBook => comicBook.id === parseInt(match.params.bookid))
            return <TitleEditForm comicBook={comicBook} onUpdate={this.handleUpdateTitle} />}}
          />
          <Route path="/comics/:bookid/edit/:comicid" render={({match}) => {
            const comicBook = this.state.userComics.find(comicBook => comicBook.id === parseInt(match.params.bookid))
            const comic = comicBook.comics.find(comic => comic.id === parseInt(match.params.comicid))
            return <ComicEditFormContainer comicBook={comicBook} comic={comic} onUpdate={this.handleUpdateComicBook} />}}
          />
          <Route path="/comics/:id" render={({match}) => {
            const comicBook = this.state.userComics.find(comicBook => comicBook.id === parseInt(match.params.id))
            return <ComicBookShow comicBook={comicBook} />}}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(ComicsContainer)
