import React from 'react'

class Canvas extends React.Component {
  constructor(){
    super()
    this.state = {
      rectWidth: 300
    }
  }

  componentDidMount() {
    // grab canvas element and set to state
    this.setState({canvas: this.refs.canvas})
    // create a drawing object and set to state
    this.setState({context: this.refs.canvas.getContext('2d')})
    // grab image element and set to variable
    const img = this.refs.image
    // once image has loaded, start drawing
    img.onload = () => {
      // draw image
      this.state.context.drawImage(img,0,0)
      // wrap and render text for the first time
      this.wrapAndRenderText()
      // know that we know size of text area, draw a rectangle based on those dimensions
      this.renderRect()
      // since text is now covered by rect, draw text again
      this.wrapAndRenderText()

      // convert the canvas drawing into a 64 bit encoded PNG URL
      const dataURL = this.state.canvas.toDataURL()
      // if we are creating a comic
      if(this.props.createComic){
        // call the callback method and pass it the dataURL
        this.props.createComic(dataURL)
      // if we are updating a comic
      } else if(this.props.updateComic){
        // call the callback method and pass it the dataURL
        this.props.updateComic(dataURL)
      }
    }
  }
  // maybe call 'drawRect' instead
  renderRect(){
    // set the fill style for the rectangle
    this.state.context.fillStyle = "#FFFFFF"
    // set the stroke style for the rectangle
    this.state.context.strokeStyle="#000000"
    // draw/stroke outside of rectangle
    this.state.context.strokeRect(245,40,this.state.rectWidth,this.state.rectHeight)
    // draw/fill rectangle
    this.state.context.fillRect(245,40,this.state.rectWidth,this.state.rectHeight)
  }

  wrapAndRenderText() {
    // set fill style for text
    this.state.context.fillStyle = "#000000"
    // set font
    this.state.context.font = "17px 'RoofRunners'"
    // set line height for text
    let lineHeight = 22
    // set x coordinate for when we draw the text
    let x = 252
    // set y coordinate for when we draw the text (this variable gets updated)
    let y = 60
    // initialize variable for rectHeight (will be updated later)
    let rectHeight = 0
    // set variable for number of lines of text (will be updated)
    let numOfLines = 1
    // split text into an array of words
    let words = this.props.comic.panels[0].text.split(' ')
    // set a line that is an empty string (will be updated/added to)
    let line = ''

    // iterate over each word in the array
    for(let n = 0; n < words.length; n++) {
      // creates a test line of text that adds the current word and a
      // space onto the current line of text
      let testLine = line + words[n] + ' '
      // get the measurements of the test line
      let metrics = this.state.context.measureText(testLine)
      // get the width of the test line
      let testWidth = metrics.width
      // if the width of the test line is greater than the max
      // rect width && the current word isn't the first word
      if (testWidth > this.state.rectWidth && n > 0) {
        // draw the text with the original/previous line, not the test line
        this.state.context.fillText(line, x, y)
        // change the y coordinate / move "cursor" down a line
        y += lineHeight
        // update the height that we will use to draw the rect
        rectHeight += lineHeight
        // increase our line counter by one
        numOfLines++
        // reset the current line to this word plus a space
        line = words[n] + ' '
      }
      // if the testline isn't too wide or we're on our first word
      else {
        // set the updated line to the test line
        line = testLine
      }
    }
    // after we get through all the words, draw a line with whatever words are left
    this.state.context.fillText(line, x, y)
    // update the rect height and add 5 px for padding
    rectHeight = lineHeight + rectHeight + 5
    // add rectHeight to state so we can access it later
    this.setState({rectHeight: rectHeight})
    // if we only drew one line of text
    if(numOfLines === 1){
      // measure width of line, set the rectWidth to that plus 9 for padding
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
