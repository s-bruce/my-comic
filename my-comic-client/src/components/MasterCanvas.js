import React from 'react'



class MasterCanvas extends React.Component {
  constructor(){
    super()
    this.state = {
      rectWidth: 300
    }
  }

  componentDidMount() {
    const canvas1 = this.refs.canvas1
    canvas1.onload = () => {
      const canvas2 = this.refs.canvas2
      canvas2.onload = () => {
        this.setState({canvasMaster: this.refs.canvasMaster})
        this.setState({contextMaster: this.refs.canvasMaster.getContext('2d')})
        this.drawCanvasMaster(canvas1, canvas2)
      }
    }
  }

  drawCanvasMaster(canvas1, canvas2){
    this.state.contextMaster.drawImage(canvas1,0,0)
    this.state.contextMaster.drawImage(canvas2,0,550)
    this.handleMergePanels()
  }

  handleMergePanels(){
    const dataURL = this.state.canvasMaster.toDataURL()

    if (this.props.createComic){
      this.props.createComic(dataURL)
    } else if (this.props.updateComic){
      this.props.updateComic(dataURL)
    }
  }

  render() {
    return (
      <div>
        <div>
          <canvas ref="canvasMaster" width={800} height={1100} className="hidden-image" />
          <img ref="canvas1" src={this.props.canvas1} className="hidden-image" alt="" crossOrigin="Anonymous" />
          <img ref="canvas2" src={this.props.canvas2} className="hidden-image" alt="" crossOrigin="Anonymous" />
        </div>
      </div>
    )
  }
}

export default MasterCanvas
