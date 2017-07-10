import React from 'react'
import request from 'superagent'
import { withRouter } from 'react-router-dom'
import { Grid, Divider, Segment, Button, Form, Image } from 'semantic-ui-react'

import ComicCreateForm1Copy from './ComicCreateForm1'
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
    this.handleCreateComicBook = this.handleCreateComicBook.bind(this)
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
          this.setState({
            scaledImageUrl: this.getScaledUrl(response.body.secure_url)
          })
          // refactor? combine these two setStates??
        }
      })
    }
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

    const panels = this.state.comic.panels
    panels[0].text = panels[0].text.replace(/"/g, "'")
    this.setState({
      comic: {panels}
    })

    this.setState({renderCanvas: true})
  }

  handleCreateComic(dataURL){
    this.setState({canvas_url: dataURL})

    const comic = {
      canvas_url: dataURL,
      panels_attributes: {
        '0': {
          text: this.state.comic.panels[0].text,
          image_url: this.state.comic.panels[0].image_url
        }
      }
    }

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

  handleCreateComicBook(){
    this.props.onCreateComicBook()
  }

  render(){
    return(
      <div>
        {this.state.renderNewInstance ?
          (<ComicCreateForm1Copy onCreateComic={this.props.onCreateComic} onCreateComicBook={this.props.onCreateComicBook} />)
          : (
          <div>
            <Divider hidden />
            <Grid textAlign='center'>
              <Grid.Row>
                <h1 className='title-font'>Create A One-Panel Page</h1>
              </Grid.Row>
            </Grid>
            <Divider hidden />
            <Divider />
            <Divider hidden />

            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Segment color='blue' inverted padded>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Input type='file' label='Image' required onChange={this.handleFileUpload} />
                      <Form.TextArea rows='3' label='Text' placeholder='Text' value={this.state.comic.panels[0].text} required onChange={(e)=> {this.handleTextChange(e)}} />
                      <Form.Button type='submit' content='Create Page' color='yellow' />
                    </Form>
                  </Segment>
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

            {this.state.renderCanvas ?
              (<Canvas comic={this.state.comic} scaledImageUrl={this.state.scaledImageUrl} createComic={this.handleCreateComic} />)
              : null }
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(ComicCreateForm1)
