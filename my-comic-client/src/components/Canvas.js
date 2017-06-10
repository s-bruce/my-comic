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
    img.onload = () => {
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
    this.state.context.font = "18px 'PatrickHand'"
    let lineHeight = 25
    let x = 250
    let y = 60
    let rectHeight = 0
    let numOfLines = 1
    let words = this.props.text.split(' ')
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
      title: this.props.title,
      text: this.props.text,
      image_url: this.props.image,
      canvas_url: dataURL
    }
    this.props.onCreate(comic)
  }

  handleUpdateComic(){
    const dataURL = this.state.canvas.toDataURL()
    const comic = {
      id: this.props.id,
      title: this.props.title,
      text: this.props.text,
      image_url: this.props.image,
      canvas_url: dataURL
    }
    this.props.onUpdate(comic)
  }

  render() {
    return (
      <div>
        <div>
          <canvas ref="canvas" width={800} height={1100} style={{border: '1px solid #000000'}} />
          <img ref="image" src={this.props.image} className="hidden-image" crossOrigin="Anonymous" />
        </div>
      </div>
    )
  }
}

export default Canvas
