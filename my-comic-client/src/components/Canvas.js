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

      const dataURL = this.state.canvas.toDataURL()
      if(this.props.createComic){
        this.props.createComic(dataURL)
      } else if(this.props.updateComic){
        this.props.updateComic(dataURL)
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
    this.state.context.font = "17px 'RoofRunners'"
    let lineHeight = 22
    let x = 252
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
    rectHeight = lineHeight + rectHeight + 5
    this.setState({rectHeight: rectHeight})
    if(numOfLines === 1){
      this.setState({rectWidth: this.state.context.measureText(line).width+9})
    }
  }

  render() {
    return (
      <div>
        <div>
          <canvas ref="canvas" width={800} height={1100} className="hidden-image" />
          <img ref="image" src={this.props.scaledImageUrl} className="hidden-image" alt="" crossOrigin="Anonymous" />
        </div>
      </div>
    )
  }
}

export default Canvas
