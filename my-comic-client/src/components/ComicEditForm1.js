import React from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Button, Form, Message } from 'semantic-ui-react'

import Canvas from './Canvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicEditForm1 extends React.Component {
  constructor(props){
    super(props)

    const panels = props.comic.panels.map(panel => {
      return {
        text: panel.text,
        image_url: panel.image_url,
        scaledImageUrl: ''
      }
    })

    this.state = {
      comic: {
        canvas_url: props.comic.canvas_url,
        panels: panels,
        renderCanvas: false,
        comicUpdated: false
      }
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.setScaledUrl = this.setScaledUrl.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdateComic = this.handleUpdateComic.bind(this)
  }

  handleFileUpload(e){
    if (e.target.value){
      const file = e.target.files[0]
      const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file)
      upload.end((err, response) => {
        if (err) {
          console.error(err)
        }
        if (response.body.secure_url !== '') {
          const panels = this.state.comic.panels
          panels[0].image_url = response.body.secure_url
          this.setState({
            comic: {panels}
          })
          // refactor? combine these two setStates??
        }
      })
    }
  }

  handleTextChange(e){
    const panels = this.state.comic.panels
    panels[0].text = e.target.value

    this.setState({
      comic: {panels}
    })
  }

  setScaledUrl(){
    let base = "http://res.cloudinary.com/dj1bsyieo/image/upload/"
    let manipulation = "w_800,h_1100,c_fill/"
    let splitUrl = ""
    let file = ""
    const panels = this.state.comic.panels
    panels.forEach((panel, index) => {
      splitUrl = panel.image_url.split("/")
      file = splitUrl[splitUrl.length-1]
      panel.scaledImageUrl = base + manipulation + file
    })
    this.setState({
      comic: {panels}
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.setScaledUrl()
    this.setState({renderCanvas: true})
  }

  handleUpdateComic(dataURL){
    const comic = {
      id: this.props.comic.id,
      canvas_url: dataURL,
      comic_book_id: this.props.comic.comic_book_id,
      panels: [
        {
          id: this.props.comic.panels[0].id,
          text: this.state.comic.panels[0].text,
          image_url: this.state.comic.panels[0].image_url,
          comic_id: this.props.comic.panels[0].comic_id
        }
      ]
    }

    this.props.onEdit(comic)
    this.setState({comicUpdated: true})
  }

  render(){
    if (!this.props.comic) {
      return null
    }

    return(
      <div>
        <h2>Edit Page</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input type='file' label='Choose a different image:' onChange={this.handleFileUpload} />
          <Form.TextArea rows='3' label='Edit text:' value={this.state.comic.panels[0].text} required onChange={(e)=> {this.handleTextChange(e)}} />
          <Form.Button type='submit' content='Edit Page' color='blue' />
        </Form>

        {this.state.comicUpdated ? (
          <Message positive>
            <Message.Header>Page successfully updated!</Message.Header>
            <p>See your updated <Link to={`/comics/${this.props.comicBookId}`}>comic</Link>.</p>
          </Message>)
        : null }

        {this.state.renderCanvas ?
          (<Canvas comic={this.state.comic} scaledImageUrl={this.state.comic.panels[0].scaledImageUrl} updateComic={this.handleUpdateComic} />)
          : null }
      </div>
    )
  }
}

ComicEditForm1.defaultProps = {
  comic: {
    canvas_url: '',
    panels: [
      {
        text: '',
        image_url: ''
      }
    ]
  }
}

export default ComicEditForm1
