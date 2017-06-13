import React from 'react'

class Canvas2 extends React.Component {
  constructor(){
    super()
    this.state = {
      rectWidth: 300
    }
  }

  componentDidMount() {
    const img1 = this.refs.image1
    console.log("img1: ", img1);
    img1.onload = () => {
      console.log("Image 1 loaded");
      this.drawCanvas1(img1)
      const img2 = this.refs.image2
      console.log("img2: ", img2);
      img2.onload = () => {
        console.log("image 2 loaded");
        this.drawCanvas2(img2)
        this.drawCanvasMaster()
      }
    }
  }

  drawCanvas1(img){
    console.log("got to drawCanvas1");
    this.setState({canvas1: this.refs.canvas1})
    this.setState({context1: this.refs.canvas1.getContext('2d')})
    this.state.context1.drawImage(img,0,0)
    const text1 = this.props.comic.panels[0].text
    this.wrapAndRenderText(this.state.context1, text1)
    this.renderRect(this.state.context1)
    this.wrapAndRenderText(this.state.context1, text1)
  }

  drawCanvas2(img){
    console.log("got to drawCanvas2");
    this.setState({canvas2: this.refs.canvas2})
    this.setState({context2: this.refs.canvas2.getContext('2d')})
    this.setState({rectWidth: 300})
    this.state.context2.drawImage(img,0,0)
    const text2 = this.props.comic.panels[1].text
    this.wrapAndRenderText(this.state.context2, text2)
    this.renderRect(this.state.context2)
    this.wrapAndRenderText(this.state.context2, text2)
  }

  drawCanvasMaster(){
    console.log("got to drawCanvasMaster");
    this.setState({canvasMaster: this.refs.canvasMaster})
    this.setState({contextMaster: this.refs.canvasMaster.getContext('2d')})
    this.state.contextMaster.drawImage(this.state.canvas1,0,0)
    this.state.contextMaster.drawImage(this.state.canvas2,0,550)
    console.log("done drawing");
    if(this.props.onCreate){
      this.handleCreateComic()
    } else if(this.props.onUpdate){
      this.handleUpdateComic()
    }
  }

  renderRect(context){
    context.fillStyle = "#FFFFFF"
    context.strokeStyle="#000000"
    context.strokeRect(245,40,this.state.rectWidth,this.state.rectHeight)
    context.fillRect(245,40,this.state.rectWidth,this.state.rectHeight)
  }

  wrapAndRenderText(context, text) {
    context.fillStyle = "#000000"
    context.font = "20px 'Patrick Hand SC'"
    let lineHeight = 25
    let x = 250
    let y = 60
    let rectHeight = 0
    let numOfLines = 1
    let words = text.split(' ')
    let line = ''

    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' '
      let metrics = context.measureText(testLine)
      let testWidth = metrics.width
      if (testWidth > this.state.rectWidth && n > 0) {
        context.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
        rectHeight += lineHeight
        numOfLines++
      }
      else {
        line = testLine
      }
    }
    context.fillText(line, x, y)
    rectHeight += lineHeight
    this.setState({rectHeight: rectHeight})
    if(numOfLines === 1){
      this.setState({rectWidth: context.measureText(line).width+5})
    }
  }

  handleCreateComic(){
    const dataURL = this.state.canvasMaster.toDataURL()
    const comic = {
      comic: {
        title: this.props.comic.title,
        canvas_url: dataURL,
        panels_attributes: {
          '0': {
            text: this.props.comic.panels[0].text,
            image_url: this.props.comic.panels[0].cloudinaryImageUrl
          },
          '1': {
            text: this.props.comic.panels[1].text,
            image_url: this.props.comic.panels[1].cloudinaryImageUrl
          }
        }
      }
    }
    this.props.onCreate(comic)
  }

  handleUpdateComic(){
    const dataURL = this.state.canvasMaster.toDataURL()
    const comicId = this.props.comic.id
    const comic = {
      comic: {
        title: this.props.comic.title,
        canvas_url: dataURL,
        panels_attributes: {
          '0': {
            id: this.props.comic.panels[0].id,
            text: this.props.comic.panels[0].text,
            image_url: this.props.comic.panels[0].cloudinaryImageUrl
          },
          '1': {
            id: this.props.comic.panels[1].id,
            text: this.props.comic.panels[1].text,
            image_url: this.props.comic.panels[1].cloudinaryImageUrl
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
          <canvas ref="canvasMaster" width={800} height={1100} />
          <canvas ref="canvas1" width={800} height={550} />
          <canvas ref="canvas2" width={800} height={550} />
          <img ref="image1" src={this.props.comic.panels[0].scaledImageUrl} className="hidden-image" alt="" crossOrigin="Anonymous" />
          <img ref="image2" src={this.props.comic.panels[1].scaledImageUrl} className="hidden-image" alt="" crossOrigin="Anonymous" />
        </div>
      </div>
    )
  }
}

export default Canvas2
