import React from 'react'
import request from 'superagent'

import Canvas from './Canvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicCreateForm extends React.Component {
  constructor(){
    super()

    this.state = {
      title: '',
      text: '',
      cloudinaryImageUrl: '',
      renderCanvas: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    return(
      <div>
        <h1>Create A Comic</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Choose your image file:</label><br/>
          <input type="file" onChange={this.handleFileUpload} /><br/><br/>
          <label>Comic Title:</label><br/>
          <input type="text" onChange={(e)=> {this.handleInputChange(e, "title")}} /><br/><br/>
          <label>Comic Text:</label><br/>
          <textarea rows="4" cols="50" onChange={(e)=> {this.handleInputChange(e, "text")}} /><br/><br/>
          <input type="submit" value="Create Comic" />
        </form>
        {this.state.renderCanvas ?
          (<Canvas image={this.state.cloudinaryImageUrl} text={this.state.text} title={this.state.title} onCreate={this.props.onCreate} />)
          : null }

      </div>
    )
  }
}

export default ComicCreateForm


// Code to upload to cloudinary. Doesn't work
// fetch(CLOUDINARY_UPLOAD_URL, {
//   method: 'POST',
//   body: {
//     file: file,
//     upload_preset: CLOUDINARY_UPLOAD_PRESET
//   }
// })
// .then(res => {
//   console.log(res.body.secure_url)
// })
