import React from 'react'
import request from 'superagent'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

import Canvas from './Canvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicCreateForm1 extends React.Component {
  constructor(){
    super()

    this.state = {
      comic: {
        panels: [
          {
            text: '',
            image_url: ''
          }
        ]
      },
      scaledImageUrl: '',
      renderCanvas: false,
      comicCreated: false,
      renderNewInstance: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCreateComic = this.handleCreateComic.bind(this)
    this.handleRenderAnotherForm = this.handleRenderAnotherForm.bind(this)
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
        const panels = this.state.comic.panels
        panels[0].image_url = response.body.secure_url
        this.setState({
          comic: {panels}
        })
        this.setState({
          scaledImageUrl: this.getScaledUrl(response.body.secure_url)
        })
        // refactor? combine these two setStates??
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

  handleTextChange(e){
    const panels = this.state.comic.panels
    panels[0].text = e.target.value

    this.setState({
      comic: {panels}
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({renderCanvas: true})
  }

  handleCreateComic(dataURL){
    // this will make a comic object
    const comic = {
      comic: {
        canvas_url: dataURL,
        panels_attributes: {
          '0': {
            text: this.state.comic.panels[0].text,
            image_url: this.state.comic.panels[0].image_url
          }
        }
      }
    }
    // call this.props.onCreateComic and pass comic object
    this.props.onCreateComic(comic)
    this.setState({comicCreated: true})
  }

  handleRenderAnotherForm(numOfPanels){
    if (numOfPanels === 1){
      this.setState({renderNewInstance: true})
    } else {
      this.props.history.push('/comics/new/2')
    }
  }

  render(){
    console.log("form1 state: ", this.state);
    return(
      <div>
        {this.state.renderNewInstance ?
          (<ComicCreateForm1 onCreateComic={this.props.onCreateComic} />)
          : (
          <div>
            <h2>Create A One-Panel Page</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input type='file' label='Image' onChange={this.handleFileUpload} />
              <Form.TextArea rows='3' label='Text' placeholder='Text' value={this.state.comic.panels[0].text} onChange={(e)=> {this.handleTextChange(e)}} />
              <Form.Button type='submit' content='Create Page' color='blue' />
            </Form>

            {this.state.renderCanvas ?
              (<Canvas comic={this.state.comic} scaledImageUrl={this.state.scaledImageUrl} createComic={this.handleCreateComic} />)
              : null }

            {this.state.comicCreated ? (
              <div>
                <h3>What do you want to do next?</h3>
                <Button content='Create a one-panel page' color='yellow' onClick={()=> {this.handleRenderAnotherForm(1)}} />
                <Button content='Create a two-panel page' color='yellow' onClick={()=> {this.handleRenderAnotherForm(2)}} />
                <Button content="I'm finished! Show me my comic book" color='blue' floated='right' />
              </div>
              )
              : null }
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(ComicCreateForm1)
