import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Divider, Segment, Button, Form, Message } from 'semantic-ui-react'

class TitleEditForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title: props.comicBook.title,
      titleUpdated: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e){
    this.setState({title: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onUpdate(this.props.comicBook.id, this.state.title)
    this.setState({titleUpdated: true})
  }

  render(){
    if (!this.props.comicBook) {
      return null
    }

    return(
      <div>
        <Divider hidden />
        <Grid textAlign='center'>
          <Grid.Row>
            <h1 className='title-font'>Edit Title</h1>
          </Grid.Row>
        </Grid>
        <Divider hidden />

        <Grid>
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Segment color='blue' inverted padded>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input type='text' label='Title:' value={this.state.title} required onChange={this.handleInputChange} />
                  <Form.Button type='submit' content='Edit Title' color='yellow' />
                </Form>
              </Segment>
              <Divider hidden />
              {this.state.titleUpdated ? (
                <Message>
                  <Message.Header>Title successfully updated!</Message.Header>
                  <p>See your updated <Link to={`/comics/${this.props.comicBook.id}`}>comic</Link>.</p>
                </Message>)
              : null }
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

TitleEditForm.defaultProps = {
  title: ''
}

export default TitleEditForm
