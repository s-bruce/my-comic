import React from 'react'
import request from 'superagent'
import { Grid } from 'semantic-ui-react'

import Canvas from './Canvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicEditForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      id: props.comic.id,
      title: props.comic.title,
      canvasUrl: props.comic.canvas_url,
      panels: [
        {
          id: props.comic.panels[0].id,
          text: props.comic.panels[0].text,
          cloudinaryImageUrl: props.comic.panels[0].image_url,
          scaledImageUrl: ''
        }
      ],
      renderCanvas: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(props){
    const panels = this.state.panels
    panels[0].id = props.comic.panels[0].id
    panels[0].text = props.comic.panels[0].text
    panels[0].cloudinaryImageUrl = props.comic.panels[0].image_url
    this.setState({
      id: props.comic.id,
      title: props.comic.title,
      panels: panels
    })
  }

  handleFileUpload(e){
    const file = e.target.files[0]
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)
    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }
      if (response.body.secure_url !== '') {
        const panels = this.state.panels
        panels[0].cloudinaryImageUrl = response.body.secure_url
        this.setState({
          panels: panels
        })
      }
    })
  }

  handleTitleChange(e){
    this.setState({title: e.target.value})
  }

  handleTextChange(e){
    const panels = this.state.panels
    panels[0].text = e.target.value

    this.setState({
      panels: panels
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.setScaledUrl()
    this.setState({renderCanvas: true})
  }

  setScaledUrl(){
    const base = "http://res.cloudinary.com/dj1bsyieo/image/upload/"
    const manipulation = "w_800,h_1100,c_fill/"
    const splitUrl = this.state.panels[0].cloudinaryImageUrl.split("/")
    const file = splitUrl[splitUrl.length-1]
    const panels = this.state.panels
    panels[0].scaledImageUrl = base + manipulation + file
    this.setState({
      panels: panels
    })
  }

  render(){
    if (!this.props.comic) {
      return null
    }

    return(
      <div>
        <h1>Edit {this.props.comic.title}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Choose a different image:</label><br/>
          <input type="file" onChange={this.handleFileUpload} /><br/><br/>
          <label>Edit Title:</label><br/>
          <input type="text" value={this.state.title} onChange={(e)=> {this.handleTitleChange(e)}} /><br/><br/>
          <label>Edit Text:</label><br/>
          <textarea rows="4" cols="50" value={this.state.panels[0].text} onChange={(e)=> {this.handleTextChange(e)}} /><br/><br/>
          <input type="submit" value="Edit Comic" />
        </form><br/><br/>
        <h3>Original Comic:</h3>
        <img src={this.props.comic.canvas_url} className="component-preview" alt="" />

        {this.state.renderCanvas ?
          (<Canvas comic={this.state} onUpdate={this.props.onUpdate} />)
          : null }
      </div>
    )
  }
}

ComicEditForm.defaultProps = {
  comic: {
    id: '',
    title: '',
    canvasUrl: '',
    panels: [{id: '', text: '', image_url: ''}]
  }
}

export default ComicEditForm
