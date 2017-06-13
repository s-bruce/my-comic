import React from 'react'
import request from 'superagent'
import { Grid } from 'semantic-ui-react'

import Canvas from './Canvas'
import Canvas2 from './Canvas2'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicEditForm extends React.Component {
  constructor(props){
    super(props)

    const panels = props.comic.panels.map(panel => {
      return {
        id: panel.id,
        text: panel.text,
        cloudinaryImageUrl: panel.image_url,
        scaledImageUrl: ''
      }
    })

    this.state = {
      id: props.comic.id,
      title: props.comic.title,
      canvasUrl: props.comic.canvas_url,
      panels: panels,
      renderCanvas: ''
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(props){
    const panels = props.comic.panels.map(panel =>  {
      return {
        id: panel.id,
        text: panel.text,
        cloudinaryImageUrl: panel.image_url,
        scaledImageUrl: ''
      }
    })

    this.setState({
      id: props.comic.id,
      title: props.comic.title,
      canvasUrl: props.comic.canvas_url,
      panels: panels
    })
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
        this.setState({
          panels: panels
        })
      }
    })
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
    this.setScaledUrl()
    console.log("done");
    switch (this.state.panels.length) {
      case 1:
        this.setState({renderCanvas: "one panel"})
        break
      case 2:
        this.setState({renderCanvas: "two panel"})
        break
    }
  }

  setScaledUrl(){
    const base = "http://res.cloudinary.com/dj1bsyieo/image/upload/"
    let manipulation = ""
    switch (this.state.panels.length) {
      case 1:
        manipulation = "w_800,h_1100,c_fill/"
        break
      case 2:
        manipulation = "w_800,h_550,c_fill/"
        break
    }
    let splitUrl = ""
    let file = ""
    const panels = this.state.panels
    panels.forEach((panel, index) => {
      splitUrl = panel.cloudinaryImageUrl.split("/")
      file = splitUrl[splitUrl.length-1]
      panel.scaledImageUrl = base + manipulation + file
    })
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
          <label>Edit Title:</label><br/>
          <input type="text" value={this.state.title} onChange={(e)=> {this.handleTitleChange(e)}} /><br/><br/>

          {(this.state.panels.length > 1) ? <h3>Panel 1:</h3> : null}
          <label>Choose a different image:</label><br/>
          <input type="file" onChange={(e)=> {this.handleFileUpload(e, 0)}} /><br/><br/>
          <label>Edit Text:</label><br/>
          <textarea rows="4" cols="50" value={this.state.panels[0].text} onChange={(e)=> {this.handleTextChange(e, 0)}} /><br/><br/>

          {this.state.panels.length > 1 &&
            <span>
              <h3>Panel 2:</h3>
              <label>Choose a different image:</label><br/>
              <input type="file" onChange={(e)=> {this.handleFileUpload(e, 1)}} /><br/><br/>
              <label>Edit Text:</label><br/>
              <textarea rows="4" cols="50" value={this.state.panels[1].text} onChange={(e)=> {this.handleTextChange(e, 1)}} /><br/><br/>
            </span>
          }

          <input type="submit" value="Edit Comic" />
        </form><br/><br/>
        <h3>Original Comic:</h3>
        <img src={this.props.comic.canvas_url} className="component-preview" alt="" />

        {this.state.renderCanvas === "one panel" ?
          (<Canvas comic={this.state} onUpdate={this.props.onUpdate} />)
          : null
        }
        {this.state.renderCanvas === "two panel" ?
          (<Canvas2 comic={this.state} onUpdate={this.props.onUpdate} />)
          : null
        }
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
