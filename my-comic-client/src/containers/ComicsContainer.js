import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { fetchComics, createComic, updateComic } from '../api'
import ComicCreateForm from '../components/ComicCreateForm'
import ComicCreateForm2 from '../components/ComicCreateForm2'
import ComicShow from '../components/ComicShow'
import ComicEditForm from '../components/ComicEditForm'

class ComicsContainer extends React.Component{
  constructor(){
    super()

    this.state = {
      comics: []
    }

    this.handleCreateComic = this.handleCreateComic.bind(this)
    this.handleUpdateComic = this.handleUpdateComic.bind(this)
  }

  componentDidMount(){
    fetchComics()
    .then(comics => this.setState({comics: comics}))
  }

  handleCreateComic(comic){
    createComic(comic)
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
          <Route exact path="/comics/new" render={()=> <ComicCreateForm onCreate={this.handleCreateComic}/>} />
          <Route path="/comics/new/2" render={()=> <ComicCreateForm2 onCreate={this.handleCreateComic}/>} />
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

export default ComicsContainer

// .then(() => {
//   this.setState(prevState => {
//     return {
//       comics: prevState.comics.map(com => {
//         if (com.id === comic.id) {
//           return comic
//         } else {
//           return com
//         }
//       })
//     }
//   })
//   this.props.history.push(`/comics/${comic.id}`)
// })
