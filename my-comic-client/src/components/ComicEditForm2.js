import React from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Grid, Divider, Segment, Button, Form, Image, Message } from 'semantic-ui-react'

import ComicCreateForm2Copy from './ComicCreateForm2'
import Canvas2 from './Canvas2'
import MasterCanvas from './MasterCanvas'

const CLOUDINARY_UPLOAD_PRESET = 'azp6zqy3'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dj1bsyieo/image/upload'

class ComicEditForm2 extends React.Component {
  constructor(props){
    super(props)

    const panels = props.comic.panels.map(panel => {
      return {
        text: panel.text,
        image_url: panel.image_url,
        scaledImageUrl: ''
      }
    })

    this.state = {
      comic: {
        canvas_url: props.comic.canvas_url,
        panels: panels
      },
      renderForm2: false,
      renderCanvas1: false,
      renderCanvas2: false,
      renderMasterCanvas: false,
      comicUpdated: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.getScaledUrl = this.getScaledUrl.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdatePanelOne = this.handleUpdatePanelOne.bind(this)
    this.handleUpdatePanelTwo = this.handleUpdatePanelTwo.bind(this)
    this.handleMergePanels = this.handleMergePanels.bind(this)
    this.handleUpdateComic = this.handleUpdateComic.bind(this)
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
          this.setState({
            comic: {panels}
          })
        }
      })
    }
  }

  handleTextChange(e, index){
    const panels = this.state.comic.panels
    panels[index].text = e.target.value

    this.setState({
      comic: {panels}
    })
  }

  getScaledUrl(url){
    let base = "http://res.cloudinary.com/dj1bsyieo/image/upload/"
    let manipulation = "w_800,h_550,c_fill/"
    let splitUrl = url.split("/")
    let file = splitUrl[splitUrl.length-1]
    return base + manipulation + file
  }

  handleSubmit(e, index, renderCanvas){
    e.preventDefault()

    const panels = this.state.comic.panels
    panels[index].text = panels[index].text.replace(/"/g, "'")
    panels[index].scaledImageUrl = this.getScaledUrl(panels[index].image_url)

    this.setState({
      comic: {panels}
    })

    this.setState({[renderCanvas]: true})
  }

  handleUpdatePanelOne(dataURL){
    this.setState({canvas1: dataURL})
    this.setState({renderForm2: true})
    window.scrollTo(0,document.body.scrollHeight)
  }

  handleUpdatePanelTwo(dataURL){
    this.setState({canvas2: dataURL})
    window.scrollTo(0,document.body.scrollHeight)
  }

  handleMergePanels(){
    this.setState({renderMasterCanvas: true})
  }

  handleUpdateComic(dataURL){
    this.setState({canvas_url: dataURL})

    const comic = {
      id: this.props.comic.id,
      canvas_url: dataURL,
      comic_book_id: this.props.comic.comic_book_id,
      panels: [
        {
          id: this.props.comic.panels[0].id,
          text: this.state.comic.panels[0].text,
          image_url: this.state.comic.panels[0].image_url,
          comic_id: this.props.comic.panels[0].comic_id
        },
        {
          id: this.props.comic.panels[1].id,
          text: this.state.comic.panels[1].text,
          image_url: this.state.comic.panels[1].image_url,
          comic_id: this.props.comic.panels[1].comic_id
        }
      ]
    }

    this.props.onEdit(comic)
    this.setState({comicUpdated: true})
    window.scrollTo(0,document.body.scrollHeight)
  }

  render(){
    if (!this.props.comic) {
      return null
    }

    return(
      <div>
        <Divider hidden />
        <Grid textAlign='center'>
          <Grid.Row>
            <h1 className='title-font'>Edit Page</h1>
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
                  <Form.Input type='file' label='Choose a different image (optional)' onChange={(e)=> {this.handleFileUpload(e, 0)}} />
                  <Form.TextArea rows='3' label='Text:' value={this.state.comic.panels[0].text} required onChange={(e)=> {this.handleTextChange(e, 0)}} />
                  <Form.Button type='submit' content='Edit Panel One' color='yellow' />
                </Form>
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

        {this.state.renderCanvas1 ?
          (<Canvas2 panel={this.state.comic.panels[0]} updatePanel={this.handleUpdatePanelOne} />)
          : null }

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
                      <Form.Input type='file' label='Choose a different image (optional)' onChange={(e)=> {this.handleFileUpload(e, 1)}} />
                      <Form.TextArea rows='3' label='Edit text:' value={this.state.comic.panels[1].text} required onChange={(e)=> {this.handleTextChange(e, 1)}} />
                      <Form.Button type='submit' content='Edit Panel Two' color='yellow' />
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
                  <Button content='Merge Panels and Update Page' color='red' onClick={this.handleMergePanels} /><Divider hidden />
                  {this.state.comicUpdated ? (
                    <Message>
                      <Message.Header>Page successfully updated!</Message.Header>
                      <p>See your updated <Link to={`/comics/${this.props.comicBookId}`}>comic</Link>.</p>
                    </Message>)
                  : null }
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={9}>
                  {this.state.comicUpdated ? (
                    <Image src={this.state.canvas_url} />
                    )
                    : null }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          )
          : null }

        {this.state.renderMasterCanvas ?
          (<MasterCanvas canvas1={this.state.canvas1} canvas2={this.state.canvas2} updateComic={this.handleUpdateComic} />)
          : null }

        {this.state.renderCanvas2 ?
          (<Canvas2 panel={this.state.comic.panels[1]} updatePanel={this.handleUpdatePanelTwo} />)
          : null }
      </div>
    )
  }
}

ComicEditForm2.defaultProps = {
  comic: {
    canvas_url: '',
    panels: [
      {
        text: '',
        image_url: ''
      }
    ]
  }
}

export default ComicEditForm2
