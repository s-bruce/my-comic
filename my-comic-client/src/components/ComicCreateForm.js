import React from 'react'
import request from 'superagent'
import { Button, Form } from 'semantic-ui-react'

import Canvas from './Canvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicCreateForm extends React.Component {
  constructor(){
    super()

    this.state = {
      title: '',
      panels: [
        {
          text: '',
          cloudinaryImageUrl: '',
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
        panels[0].scaledImageUrl = this.getScaledUrl(response.body.secure_url)
        this.setState({
          panels: panels
        })
      }
    })
  }

  getScaledUrl(url){
    let base = "http://res.cloudinary.com/dj1bsyieo/image/upload/"
    let manipulation = "w_800,h_1100,c_fill/"
    let splitUrl = url.split("/")
    let file = splitUrl[splitUrl.length-1]
    return base + manipulation + file
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
    this.setState({renderCanvas: true})
  }

  render(){
    return(
      <div>
        <h2>Create A One-Panel Comic</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input type='text' label='Comic Title' placeholder='Comic Title' value={this.state.title} onChange={(e)=> {this.handleTitleChange(e)}} />
          <Form.Input type='file' label='Image' placeholder='Image' onChange={this.handleFileUpload} />
          <Form.TextArea rows='3' label='Text' placeholder='Text' value={this.state.panels[0].text} onChange={(e)=> {this.handleTextChange(e)}} />
          <Form.Button type='submit' content='Create Comic' color='blue' />
        </Form>

        {this.state.renderCanvas ?
          (<Canvas comic={this.state} user={this.props.user} onCreate={this.props.onCreate} />)
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
