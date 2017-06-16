import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

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
        <h2>Log In</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input type='text' label='Username' placeholder='Username' value={this.state.username} required onChange={e => this.handleChange('username', e.target.value)} />
          <Form.Input type='password' label='Password' placeholder='Password' value={this.state.password} required onChange={e => this.handleChange('password', e.target.value)} />
          <Form.Button type='submit' content='Log In' color='blue' />

          {this.state.incorrectLogin ? (
            <Message negative>
              <Message.Header>Incorrect username or password.</Message.Header>
            </Message>)
            : null
          }
        </Form>
      </div>
    )
  }
}

export default LoginForm
