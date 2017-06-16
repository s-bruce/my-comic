import React from 'react'
import request from 'superagent'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

import Canvas2 from './Canvas2'
import MasterCanvas from './MasterCanvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicCreateForm2 extends React.Component {
  constructor(){
    super()

    this.state = {
      comic: {
        panels: [
          {
            text: '',
            image_url: '',
            scaledImageUrl: ''
          },
          {
            text: '',
            image_url: '',
            scaledImageUrl: ''
          }
        ]
      },
      renderCanvas1: false,
      renderCanvas2: false,
      comicCreated: false,
      renderNewInstance: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCreatePanelOne = this.handleCreatePanelOne.bind(this)
    this.handleCreatePanelTwo = this.handleCreatePanelTwo.bind(this)
    this.handleCreateComic = this.handleCreateComic.bind(this)
    this.handleMergePanels = this.handleMergePanels.bind(this)
    this.handleRenderAnotherForm = this.handleRenderAnotherForm.bind(this)
    this.handleCreateComicBook = this.handleCreateComicBook.bind(this)
  }

  handleFileUpload(e, index){
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
          panels[index].image_url = response.body.secure_url
          panels[index].scaledImageUrl = this.getScaledUrl(response.body.secure_url)
          this.setState({
            comic: {panels}
          })
        }
      })
    }
  }

  getScaledUrl(url){
    let base = "http://res.cloudinary.com/dj1bsyieo/image/upload/"
    let manipulation = "w_800,h_550,c_fill/"
    let splitUrl = url.split("/")
    let file = splitUrl[splitUrl.length-1]
    return base + manipulation + file
  }

  handleTextChange(e, index){
    const panels = this.state.comic.panels
    panels[index].text = e.target.value

    this.setState({
      comic: {panels}
    })
  }

  handleSubmit(e, prop){
    e.preventDefault()
    this.setState({[prop]: true})
  }

  handleCreatePanelOne(dataURL){
    this.setState({canvas1: dataURL})
  }

  handleCreatePanelTwo(dataURL){
    this.setState({canvas2: dataURL})
  }

  handleMergePanels(){
    this.setState({renderMasterCanvas: true})
  }

  handleCreateComic(dataURL){
    const comic = {
      canvas_url: dataURL,
      panels_attributes: {
        '0': {
          text: this.state.comic.panels[0].text,
          image_url: this.state.comic.panels[0].image_url
        },
        '1': {
          text: this.state.comic.panels[1].text,
          image_url: this.state.comic.panels[1].image_url
        }
      }
    }
    this.props.onCreateComic(comic)
    this.setState({comicCreated: true})
  }

  handleRenderAnotherForm(numOfPanels){
    if (numOfPanels === 2){
      this.setState({renderNewInstance: true})
    } else {
      this.props.history.push('/comics/new/1')
    }
  }

  handleCreateComicBook(){
    console.log("form2 handleCreateComicBook");
    this.props.onCreateComicBook()
  }

  render(){
    return(
      <div>
        {this.state.renderNewInstance ?
          (<ComicCreateForm2 onCreateComic={this.props.onCreateComic} />)
          : (
            <div>
              <h2>Create A Two-Panel Page</h2>
              <Form onSubmit={(e)=> {this.handleSubmit(e, 'renderCanvas1')}}>
                <Form.Input type='file' label='Panel One Image' required onChange={(e)=> {this.handleFileUpload(e, 0)}} />
                <Form.TextArea rows='3' label='Panel One Text' placeholder='Panel One Text' required value={this.state.comic.panels[0].text} onChange={(e)=> {this.handleTextChange(e, 0)}} />
                <Form.Button type='submit' content='Create Panel One' color='blue' />
              </Form><br/>

              <Form onSubmit={(e)=> {this.handleSubmit(e, 'renderCanvas2')}}>
                <Form.Input type='file' label='Panel Two Image' required onChange={(e)=> {this.handleFileUpload(e, 1)}} />
                <Form.TextArea rows='3' label='Panel Two Text' placeholder='Panel Two Text' required value={this.state.comic.panels[1].text} onChange={(e)=> {this.handleTextChange(e, 1)}} />
                <Form.Button type='submit' content='Create Panel Two' color='blue' />
              </Form>

              {this.state.renderCanvas1 ?
                (<Canvas2 panel={this.state.comic.panels[0]} createPanel={this.handleCreatePanelOne} />)
                : null }

              {this.state.renderCanvas2 ?
                (<Canvas2 panel={this.state.comic.panels[1]} createPanel={this.handleCreatePanelTwo} />)
                : null }

              {this.state.renderCanvas2 ?
                <Button content='Create Page' color='blue' onClick={this.handleMergePanels} />
                : null }

              {this.state.renderMasterCanvas ?
                (<MasterCanvas canvas1={this.state.canvas1} canvas2={this.state.canvas2} createComic={this.handleCreateComic} />)
                : null }

              {this.state.comicCreated ? (
                <div>
                  <h3>What do you want to do next?</h3>
                  <Button basic content='Create a one-panel page' color='blue' onClick={()=> {this.handleRenderAnotherForm(1)}} />
                  <Button basic content='Create a two-panel page' color='blue' onClick={()=> {this.handleRenderAnotherForm(2)}} />
                  <Button content="I'm finished! Show me my comic book" color='blue' floated='right' onClick={this.handleCreateComicBook} />
                </div>
                )
                : null }
            </div>
          )}
      </div>
    )
  }
}

export default withRouter(ComicCreateForm2)
