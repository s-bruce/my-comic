import React from 'react'
import request from 'superagent'

import Canvas from './Canvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicEditForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title: props.comic.title,
      text: props.comic.panels[0].text,
      cloudinaryImageUrl: props.comic.panels[0].image_url,
      renderCanvas: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(props){
    this.setState({
      title: props.comic.title,
      text: props.comic.panels[0].text,
      cloudinaryImageUrl: props.comic.panels[0].image_url
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
        this.setState({
          cloudinaryImageUrl: response.body.secure_url
        })
      }
    })
  }

  handleInputChange(e, property){
    this.setState({
      [property]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({renderCanvas: true})
  }

  render(){
    console.log();
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
          <input type="text" value={this.state.title} onChange={(e)=> {this.handleInputChange(e, "title")}} /><br/><br/>
          <label>Edit Text:</label><br/>
          <textarea rows="4" cols="50" value={this.state.text} onChange={(e)=> {this.handleInputChange(e, "text")}} /><br/><br/>
          <input type="submit" value="Edit Comic" />
        </form><br/><br/>
        <h3>Original Comic:</h3>
        <h3>{this.props.comic.title}</h3>
        <img src={this.props.comic.panels[0].canvas_url} className="component-preview" />
        <h3>Canvas:</h3>
        {this.state.renderCanvas ?
          (<Canvas image={this.state.cloudinaryImageUrl} id={this.props.comic.id} text={this.state.text} title={this.state.title} onUpdate={this.props.onUpdate} />)
          : null }
      </div>
    )
  }
}

ComicEditForm.defaultProps = {
  comic: {
    title: '',
    panels: [{text: '', image_url: ''}]
  }
}

export default ComicEditForm
