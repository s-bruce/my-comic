import React from 'react'
import request from 'superagent'

import Canvas2 from './Canvas2'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicCreateForm2 extends React.Component {
  constructor(){
    super()

    this.state = {
      title: '',
      panels: [
        {
          text: '',
          cloudinaryImageUrl: '',
          scaledImageUrl: ''
        },
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

  handleFileUpload(e, index){
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
        panels[index].cloudinaryImageUrl = response.body.secure_url
        panels[index].scaledImageUrl = this.getScaledUrl(response.body.secure_url)
        this.setState({
          panels: panels
        })
      }
    })
  }

  getScaledUrl(url){
    let base = "http://res.cloudinary.com/dj1bsyieo/image/upload/"
    let manipulation = "w_800,h_550,c_fill/"
    let splitUrl = url.split("/")
    let file = splitUrl[splitUrl.length-1]
    return base + manipulation + file
  }

  handleTitleChange(e){
    this.setState({title: e.target.value})
  }

  handleTextChange(e, index){
    const panels = this.state.panels
    panels[index].text = e.target.value

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
        <h2>Create A Two-Panel Comic</h2>
        <form onSubmit={this.handleSubmit}>
          <h3>Comic Title:</h3>
          <input type="text" value={this.state.title} onChange={(e)=> {this.handleTitleChange(e)}} />

          <h3>Panel 1:</h3>
          <label>Choose your image file:</label><br/>
          <input type="file" onChange={(e)=> {this.handleFileUpload(e, 0)}} /><br/><br/>
          <label>Comic Text:</label><br/>
          <textarea rows="4" cols="50" value={this.state.panels[0].text} onChange={(e)=> {this.handleTextChange(e, 0)}} /><br/>

          <h3>Panel 2:</h3>
          <label>Choose your image file:</label><br/>
          <input type="file" onChange={(e)=> {this.handleFileUpload(e, 1)}} /><br/><br/>
          <label>Comic Text:</label><br/>
          <textarea rows="4" cols="50" value={this.state.panels[1].text} onChange={(e)=> {this.handleTextChange(e, 1)}} /><br/><br/>

          <input type="submit" value="Create Comic" />
        </form>
        {this.state.renderCanvas ?
          (<Canvas2 comic={this.state} onCreate={this.props.onCreate} />)
          : null }

      </div>
    )
  }
}

export default ComicCreateForm2
