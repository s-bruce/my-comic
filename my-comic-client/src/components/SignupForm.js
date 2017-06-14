import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class SignupForm extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.handleSignup(this.state)
  }

  render(){
    return(
      <div>
        <h2>Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input type='text' label='Username' placeholder='Username' value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} />
          <Form.Input type='password' label='Password' placeholder='Password' value={this.state.password} onChange={e => this.handleChange('password', e.target.value)} />
          <Form.Button type='submit' content='Sign Up' color='blue' />
        </Form>
      </div>
    )
  }
}

export default SignupForm
