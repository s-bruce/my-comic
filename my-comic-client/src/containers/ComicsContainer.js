import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { fetchComics, fetchUserComics, createComicBook, updateComic } from '../api'
import Comics from '../components/Comics'
import ComicFormContainer from './ComicFormContainer'
import ComicShow from '../components/ComicShow'
import ComicEditForm from '../components/ComicEditForm'

class ComicsContainer extends React.Component{
  constructor(){
    super()

    this.state = {
      // comics: [],
      userComics: []
    }

    this.handleCreateComicBook = this.handleCreateComicBook.bind(this)
    this.handleUpdateComic = this.handleUpdateComic.bind(this)
  }

  componentDidMount(){
    // fetchComics()
    // .then(comics => this.setState({comics: comics}))
  }

  componentWillReceiveProps(props){
    fetchUserComics(props.user.id)
    .then(comics => this.setState({userComics: comics}))
  }

  handleCreateComicBook(comic){
    createComicBook(comic)
    .then(com => {
      this.setState(prevState => ({ comics: [...prevState.comics, com]}))
      this.props.history.push(`/comics/${com.id}`)
    })
  }

  handleUpdateComic(id, comic){
    updateComic(id, comic)
    .then(com => {
      this.setState(prevState => {
        const updatedComics = prevState.comics.map(c => {
          if (c.id === com.id){
            return com
          } else {
            return c
          }
        })
        return { comics: updatedComics }
      })
      this.props.history.push(`/comics/${com.id}`)
    })
  }

  render(){
    console.log("container state: ", this.state);
    return(
      <div>
        <Switch>
          <Route exact path="/comics" render={()=> <Comics userComics={this.state.userComics}/>} />
          <Route path="/comics/new" render={()=> <ComicFormContainer user={this.props.user} onCreate={this.handleCreateComicBook}/>} />
          <Route path="/comics/:id/edit" render={({match}) => {
            const comic = this.state.comics.find(comic => comic.id === parseInt(match.params.id))
            return <ComicEditForm comic={comic} onUpdate={this.handleUpdateComic} />}}
          />
          <Route path="/comics/:id" render={({match}) => {
            const comic = this.state.comics.find(comic => comic.id === parseInt(match.params.id))
            return <ComicShow comic={comic} />}}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(ComicsContainer)
