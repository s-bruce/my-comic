import React from 'react'

class Canvas extends React.Component {
  constructor(){
    super()
    this.state = {
      rectWidth: 300
    }
  }

  componentDidMount() {
    this.setState({canvas: this.refs.canvas})
    this.setState({context: this.refs.canvas.getContext('2d')})
    const img = this.refs.image
    console.log("img: ", img);
    img.onload = () => {
      console.log("img loaded");
      this.state.context.drawImage(img,0,0)
      this.wrapAndRenderText()
      this.renderRect()
      this.wrapAndRenderText()
      if(this.props.onCreate){
        this.handleCreateComic()
      } else if(this.props.onUpdate){
        this.handleUpdateComic()
      }
    }
  }

  renderRect(){
    this.state.context.fillStyle = "#FFFFFF"
    this.state.context.strokeStyle="#000000"
    this.state.context.strokeRect(245,40,this.state.rectWidth,this.state.rectHeight)
    this.state.context.fillRect(245,40,this.state.rectWidth,this.state.rectHeight)
  }

  wrapAndRenderText() {
    this.state.context.fillStyle = "#000000"
    this.state.context.font = "20px 'RoofRunners'"
    let lineHeight = 25
    let x = 250
    let y = 60
    let rectHeight = 0
    let numOfLines = 1
    let words = this.props.comic.panels[0].text.split(' ')
    let line = ''

    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' '
      let metrics = this.state.context.measureText(testLine)
      let testWidth = metrics.width
      if (testWidth > this.state.rectWidth && n > 0) {
        this.state.context.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
        rectHeight += lineHeight
        numOfLines++
      }
      else {
        line = testLine
      }
    }
    this.state.context.fillText(line, x, y)
    rectHeight += lineHeight
    this.setState({rectHeight: rectHeight})
    if(numOfLines === 1){
      this.setState({rectWidth: this.state.context.measureText(line).width+5})
    }
  }

  handleCreateComic(){
    const dataURL = this.state.canvas.toDataURL()
    const comic = {
      comic: {
        title: this.props.comic.title,
        canvas_url: dataURL,
        account_id: this.props.user.id,
        panels_attributes: {
          '0': {
            text: this.props.comic.panels[0].text,
            image_url: this.props.comic.panels[0].cloudinaryImageUrl
          }
        }
      }
    }
    this.props.onCreate(comic)
  }

  handleUpdateComic(){
    const dataURL = this.state.canvas.toDataURL()
    const comicId = this.props.comic.id
    const comic = {
      comic: {
        title: this.props.comic.title,
        canvas_url: dataURL,
        account_id: this.props.comic.account_id,
        panels_attributes: {
          '0': {
            id: this.props.comic.panels[0].id,
            text: this.props.comic.panels[0].text,
            image_url: this.props.comic.panels[0].cloudinaryImageUrl
          }
        }
      }
    }
    this.props.onUpdate(comicId, comic)
  }

  render() {
    return (
      <div>
        <div>
          <canvas ref="canvas" width={800} height={1100} />
          <img ref="image" src={this.props.comic.panels[0].scaledImageUrl} className="hidden-image" alt="" crossOrigin="Anonymous" />
        </div>
      </div>
    )
  }
}

export default Canvas
