import React from 'react'
import { Form } from 'semantic-ui-react'

const options = [
  { key: '2', text: 'Two', value: 2 },
  { key: '4', text: 'Four', value: 4 },
]

class FormWelcome extends React.Component {
  constructor(){
    super()

    this.state = {
      title: '',
      firstPage: ''
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleChange(e){
    this.setState({title: e.target.value})
  }

  handleRadioChange(e){
    this.setState({firstPage: e.currentTarget.textContent})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onGetStarted(this.state)
  }

  render(){
    return(
      <div>
        <h2>Create A Comic!</h2>
        <Form onSubmit={this.handleSubmit}>
          <h3>What is your comic's title?</h3>
          <Form.Input type='text' placeholder='Comic title' value={this.state.title} required onChange={this.handleTitleChange} />
          <Form.Group inline>
            <label>How many panels will your first page have?</label>
            <Form.Radio label='one' value='one' checked={this.state.firstPage === 'one'} onChange={this.handleRadioChange} />
            <Form.Radio label='two' value='two' checked={this.state.firstPage === 'two'} onChange={this.handleRadioChange} />
          </Form.Group>
          <Form.Button type='submit' content='Get Started!' color='blue' />
        </Form>
      </div>
    )
  }
}

export default FormWelcome
