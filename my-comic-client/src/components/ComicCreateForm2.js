import React from 'react'
import request from 'superagent'
import { withRouter } from 'react-router-dom'
import { Grid, Divider, Segment, Button, Form, Image } from 'semantic-ui-react'

import ComicCreateForm2Copy from './ComicCreateForm2'
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
      renderForm2: false,
      renderCanvas1: false,
      renderCanvas2: false,
      renderMasterCanvas: false,
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

  handleSubmit(e, index, renderCanvas){
    e.preventDefault()
    const panels = this.state.comic.panels
    panels[index].text = panels[index].text.replace(/"/g, "'")

    this.setState({
      comic: {panels}
    })

    this.setState({[renderCanvas]: true})
  }

  handleCreatePanelOne(dataURL){
    this.setState({canvas1: dataURL})
    this.setState({renderForm2: true})
    window.scrollTo(0,document.body.scrollHeight)
  }

  handleCreatePanelTwo(dataURL){
    this.setState({canvas2: dataURL})
    window.scrollTo(0,document.body.scrollHeight)
  }

  handleMergePanels(){
    this.setState({renderMasterCanvas: true})
  }

  handleCreateComic(dataURL){
    this.setState({canvas_url: dataURL})
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
    window.scrollTo(0,document.body.scrollHeight)
  }

  handleRenderAnotherForm(numOfPanels){
    if (numOfPanels === 2){
      this.setState({renderNewInstance: true})
    } else {
      this.props.history.push('/comics/new/1')
    }
  }

  handleCreateComicBook(){
    this.props.onCreateComicBook()
  }

  render(){
    return(
      <div>
        {this.state.renderNewInstance ?
          (<ComicCreateForm2Copy onCreateComic={this.props.onCreateComic} onCreateComicBook={this.props.onCreateComicBook} />)
          : (
            <div>
              <Divider hidden />
              <Grid textAlign='center'>
                <Grid.Row>
                  <h1 className='title-font'>Create A Two-Panel Page</h1>
                </Grid.Row>
              </Grid>
              <Divider hidden />
              <Divider />
              <Divider hidden />

              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Segment color='blue' inverted padded>
                      <Form onSubmit={(e)=> {this.handleSubmit(e, 0, 'renderCanvas1')}}>
                        <h3 className='comic-font'>Panel One:</h3>
                        <Form.Input type='file' label='Panel One Image' required onChange={(e)=> {this.handleFileUpload(e, 0)}} />
                        <Form.TextArea rows='3' label='Panel One Text' placeholder='Panel One Text' required value={this.state.comic.panels[0].text} onChange={(e)=> {this.handleTextChange(e, 0)}} />
                        <Form.Button type='submit' content='Create Panel One' color='yellow' />
                      </Form><br/>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={1} />
                  <Grid.Column width={9}>
                    {this.state.renderForm2 ? (
                      <Image src={this.state.canvas1} />
                    )
                      : null }
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              {this.state.renderForm2 ? (
                <div>
                  <Divider hidden />
                  <Divider />
                  <Divider hidden />
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Segment color='blue' inverted padded>
                          <Form onSubmit={(e)=> {this.handleSubmit(e, 1, 'renderCanvas2')}}>
                            <h3 className='comic-font'>Panel Two:</h3>
                            <Form.Input type='file' label='Panel Two Image' required onChange={(e)=> {this.handleFileUpload(e, 1)}} />
                            <Form.TextArea rows='3' label='Panel Two Text' placeholder='Panel Two Text' required value={this.state.comic.panels[1].text} onChange={(e)=> {this.handleTextChange(e, 1)}} />
                            <Form.Button type='submit' content='Create Panel Two' color='yellow' />
                          </Form>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column width={1} />
                      <Grid.Column width={9}>
                        {this.state.renderCanvas2 ? (
                          <Image src={this.state.canvas2} />
                        )
                          : null }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
                )
                : null }

              {this.state.renderCanvas2 ? (
                <div>
                  <Divider hidden />
                  <Divider />
                  <Divider hidden />
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Button content='Merge Panels and Create Page' color='red' onClick={this.handleMergePanels} />
                        {this.state.comicCreated ? (
                          <div>
                            <Divider hidden />
                            <Divider />
                            <Divider hidden />
                            <Segment.Group raised>
                              <Segment>
                                <h3>What do you want to do next?</h3>
                              </Segment>
                              <Segment>
                                <Button icon="write" content='Create a one-panel page' color='blue' onClick={()=> {this.handleRenderAnotherForm(1)}} /><br/><br/>
                                <Button icon="write" content='Create a two-panel page' color='blue' onClick={()=> {this.handleRenderAnotherForm(2)}} /><br/><br/>
                                <Button icon="book" content="I'm finished! Show me my comic book" color='red' onClick={this.handleCreateComicBook} />
                              </Segment>
                            </Segment.Group>
                          </div>
                        )
                        : null }
                      </Grid.Column>
                      <Grid.Column width={1} />
                      <Grid.Column width={9}>
                        {this.state.comicCreated ? (
                          <Image src={this.state.canvas_url} />
                        )
                          : null }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
                )
                : null }

              {this.state.renderCanvas1 ?
                (<Canvas2 panel={this.state.comic.panels[0]} createPanel={this.handleCreatePanelOne} />)
                : null }

              {this.state.renderCanvas2 ?
                (<Canvas2 panel={this.state.comic.panels[1]} createPanel={this.handleCreatePanelTwo} />)
                : null }

              {this.state.renderMasterCanvas ?
                (<MasterCanvas canvas1={this.state.canvas1} canvas2={this.state.canvas2} createComic={this.handleCreateComic} />)
                : null }
            </div>
          )}
      </div>
    )
  }
}

export default withRouter(ComicCreateForm2)
