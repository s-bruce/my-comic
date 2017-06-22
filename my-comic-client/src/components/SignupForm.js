import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Divider, Segment, Form, Message } from 'semantic-ui-react'

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
    return(
      <div>
        <Divider hidden />
        <Grid textAlign='center'>
          <Grid.Row>
            <h1 className='title-font'>Welcome to My Comic!</h1>
          </Grid.Row>
          <Grid.Row>
            <h3 className='comic-font'>Already have an account? <Link to={'/login'}>Log in</Link> here!</h3>
          </Grid.Row>
        </Grid>
        <Divider hidden />

        <Grid>
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Segment color="yellow" raised padded>
                <h1 className='title-font'>Sign Up</h1>
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
                </Segment>
                <Divider hidden />
                {this.state.accountedCreated ? (
                  <Message>
                    <Message.Header>Your account was successfully created.</Message.Header>
                    <p>Please <Link to='/login'>log in</Link>.</p>
                  </Message>)
                  : null
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}

export default SignupForm
