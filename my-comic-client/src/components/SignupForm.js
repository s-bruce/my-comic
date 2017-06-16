import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Message } from 'semantic-ui-react'

class SignupForm extends React.Component {
  constructor(){
    super()

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameExists = this.handleUsernameExists.bind(this)
    this.handleAccountCreated = this.handleAccountCreated.bind(this)
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.handleSignup(this.state, this.handleUsernameExists, this.handleAccountCreated)
  }

  handleUsernameExists(){
    this.setState({usernameExists: true})
  }

  handleAccountCreated(){
    this.setState({usernameExists: false})
    this.setState({accountedCreated: true})
  }

  render(){
    console.log("form state: ", this.state);
    return(
      <div>
        <h2>Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input type='text' label='Username' placeholder='Username' value={this.state.username} required onChange={e => this.handleChange('username', e.target.value)} />
          {this.state.usernameExists ? (
            <Message negative>
              <Message.Header>That username already exists.</Message.Header>
              <p>Please choose a different username.</p>
            </Message>)
            : null
          }
          <Form.Input type='password' label='Password' placeholder='Password' value={this.state.password} required onChange={e => this.handleChange('password', e.target.value)} />
          <Form.Button type='submit' content='Sign Up' color='blue' />
        </Form>

        {this.state.accountedCreated ? (
          <Message positive>
            <Message.Header>Your account was successfully created.</Message.Header>
            <p>Please <Link to='/login'>log in</Link>.</p>
          </Message>)
          : null
        }
      </div>
    )
  }
}

export default SignupForm
