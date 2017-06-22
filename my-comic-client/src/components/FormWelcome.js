import React from 'react'
import { Grid, Divider, Segment, Form, Image } from 'semantic-ui-react'

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
        <Divider hidden />
        <Grid textAlign='center'>
          <Grid.Row>
            <h1 className='title-font'>Create A Comic!</h1>
          </Grid.Row>
        </Grid>
        <Divider hidden />

        <Grid>
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Segment color='blue' inverted>
                <Form onSubmit={this.handleSubmit}>
                  <h3 className='comic-font'>What is your comic's title?</h3>
                  <Form.Input type='text' placeholder='Comic title' value={this.state.title} required onChange={this.handleTitleChange} />
                  <Form.Group inline>
                    <label>How many panels will your first page have?</label>
                    <Form.Radio label='one' value='one' checked={this.state.firstPage === 'one'} onChange={this.handleRadioChange} />
                    <Form.Radio label='two' value='two' checked={this.state.firstPage === 'two'} onChange={this.handleRadioChange} />
                  </Form.Group>
                  <Form.Button type='submit' content='Get Started!' color='yellow' />
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>

        <Divider hidden />
        <Divider hidden />
        <Divider hidden />

        <Grid>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={6}>
              <Segment textAlign='center'>
                  <h3>Example of a one-panel page</h3><Divider />
                  <Image src={require('./one-panel.png')} size='medium' centered />
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment textAlign='center'>
                <h3>Example of a two-panel page</h3><Divider />
                <Image src={require('./two-panel.png')} size='medium' centered />
              </Segment>
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
        </Grid>
        <Divider hidden />
      </div>
    )
  }
}

export default FormWelcome
