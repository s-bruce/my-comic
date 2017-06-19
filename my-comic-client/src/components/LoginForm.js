import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Divider, Segment, Button, Form, Message } from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor(){
    super()

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleIncorrectLogin = this.handleIncorrectLogin.bind(this)
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.handleLogin(this.state, this.handleIncorrectLogin)
  }

  handleIncorrectLogin(){
    this.setState({incorrectLogin: true})
  }

  render(){
    return(
      <div>
        <Divider hidden />
        <Grid textAlign='center'>
          <Grid.Row>
            <h1 className='title-font'>Welcome to My Comic!</h1>
          </Grid.Row>
          <Grid.Row>
            <h3 className='comic-font'>Don't have an account? <Link to={'/signup'}>Sign up</Link> here!</h3>
          </Grid.Row>
        </Grid>
        <Divider hidden />

        <Grid>
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Segment color="yellow" raised padded>
                <h1 className='title-font'>Log In</h1>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input type='text' label='Username' placeholder='Username' value={this.state.username} required onChange={e => this.handleChange('username', e.target.value)} />
                  <Form.Input type='password' label='Password' placeholder='Password' value={this.state.password} required onChange={e => this.handleChange('password', e.target.value)} />
                  <Form.Button type='submit' content='Log In' color='blue' />

                  {this.state.incorrectLogin ? (
                    <Message negative>
                      <Message.Header>Incorrect username or password. Please try again.</Message.Header>
                    </Message>)
                    : null
                  }
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default LoginForm
