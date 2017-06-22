import React from 'react'

import ComicEditForm1 from '../components/ComicEditForm1'
import ComicEditForm2 from '../components/ComicEditForm2'

class ComicEditFormContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      comics: props.comicBook.comics
    }

    this.editComicsArray = this.editComicsArray.bind(this)
  }

  editComicsArray(comic){
    this.setState(prevState => {
      const comics = prevState.comics.map(c => {
        if (c.id === comic.id){
          return comic
        } else {
          return c
        }
      })
      return {comics}
    })

    this.handleUpdateComicBook()
  }

  handleUpdateComicBook(){
    const updatedComics = this.state.comics.map((comic) => {
      let panels_attributes = {}
      comic.panels.forEach((panel, i) => {
        panels_attributes[i.toString()] = panel
      })
      return(
        {
          id: comic.id,
          canvas_url: comic.canvas_url,
          comic_book_id: comic.comic_book_id,
          panels_attributes: panels_attributes
        }
      )
    })

    let comics_attributes = {}
    updatedComics.forEach((comic, i) => {
      comics_attributes[i.toString()] = comic
    })

    const comic_book = {
      comic_book: {
        id: this.props.comicBook.id,
        title: this.props.comicBook.title,
        account_id: this.props.comicBook.account_id,
        comics_attributes: comics_attributes
      }
    }

    this.props.onUpdate(this.props.comicBook.id, comic_book)
  }

  render(){
    console.log("Form container props: ",this.props);
    return(
      <div>
        {this.props.comic.panels.length === 1 ?
          <ComicEditForm1 comic={this.props.comic} comicBookId={this.props.comicBook.id} onEdit={this.editComicsArray} />
          :
          <ComicEditForm2 comic={this.props.comic} comicBookId={this.props.comicBook.id} onEdit={this.editComicsArray} />
        }
      </div>
    )
  }
}

ComicEditFormContainer.defaultProps = {
  comicBook: {
    comics: []
  }
}

export default ComicEditFormContainer
