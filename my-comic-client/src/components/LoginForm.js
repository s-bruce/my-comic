import React from 'react'

class LoginForm extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  render(){
    return(
      <div>
        <h2>Log In</h2>
        <form>
          <label>Username:</label><br/>
          <input type="text" value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} /><br/><br/>
          <label>Password:</label><br/>
          <input type="password" value={this.state.password} onChange={e => this.handleChange('password', e.target.value)} /><br/><br/>
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}

export default LoginForm
