import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

import { fetchUserComics, createComicBook, updateComicBook } from '../api'
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

  componentWillReceiveProps(props){
    this.setState({fetchingComics: true})

    fetchUserComics(props.user.id)
    .then(comicBooks => {
      comicBooks.forEach(comicBook => {
        comicBook.comics.forEach(comic => {
          this.sortPanels(comic)
        })
      })

      comicBooks.forEach(comicBook => {
        this.sortComics(comicBook)
      })

      this.sortComicBooks(comicBooks)

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
      com.comics.forEach(comic => {
        this.sortPanels(comic)
      })

      this.sortComics(com)

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
      com.comics.forEach(comic => {
        this.sortPanels(comic)
      })

      this.sortComics(com)

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

  sortPanels(comic){
    comic.panels.sort(function(a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    })
    return comic
  }

  sortComics(comicBook){
    comicBook.comics.sort(function(a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    })
    return comicBook
  }

  sortComicBooks(comicBooks){
    comicBooks.sort(function(a, b) {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    })
    return comicBooks
  }

  render(){
    return(
      <div>
        {this.state.loading ? (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : null }

        <Switch>
          <Route exact path="/comics" render={()=> <Comics userComics={this.state.userComics} fetchingComics={this.state.fetchingComics} user={this.props.user}/>} />
          <Route path="/comics/welcome" render={() => <Welcome user={this.props.user} />} />
          <Route path="/comics/new" render={()=> <ComicFormContainer user={this.props.user} onCreate={this.handleCreateComicBook}/>} />
          <Route exact path="/comics/:bookid/edit/title" render={({match}) => {
            const comicBook = this.state.userComics.find(comicBook => comicBook.id === parseInt(match.params.bookid, 10))
            return <TitleEditForm comicBook={comicBook} onUpdate={this.handleUpdateTitle} />}}
          />
          <Route path="/comics/:bookid/edit/:comicid" render={({match}) => {
            const comicBook = this.state.userComics.find(comicBook => comicBook.id === parseInt(match.params.bookid, 10))
            const comic = comicBook.comics.find(comic => comic.id === parseInt(match.params.comicid, 10))
            return <ComicEditFormContainer comicBook={comicBook} comic={comic} onUpdate={this.handleUpdateComicBook} />}}
          />
          <Route path="/comics/:id" render={({match}) => {
            const comicBook = this.state.userComics.find(comicBook => comicBook.id === parseInt(match.params.id, 10))
            return <ComicBookShow comicBook={comicBook} />}}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(ComicsContainer)
