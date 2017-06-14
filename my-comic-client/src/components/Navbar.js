import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    console.log("logged in: ",this.props.loggedIn);

    return (
      <div>
        {this.props.loggedIn ? (
          <Menu header>
            <Menu.Item header>My Comic</Menu.Item>
            <Link to={`/comics`}><Menu.Item name='comics' active={activeItem === 'comics'} content='My Comics' onClick={this.handleItemClick} /></Link>
            <Link to={`/comics/new`}><Menu.Item name='new' active={activeItem === 'new'} content='Create One-Panel Comic' onClick={this.handleItemClick} /></Link>
            <Link to={`/comics/new/2`}><Menu.Item name='new2' active={activeItem === 'new2'} content='Create Two-Panel Comic' onClick={this.handleItemClick} /></Link>
            <Link to={`/logout`}><Menu.Item name='logout' active={activeItem === 'logout'} content='Log Out' onClick={this.handleItemClick} /></Link>
          </Menu>
        ) : (
          <Menu borderless>
            <Menu.Item header>My Comic</Menu.Item>
            <Link to={`/signup`}><Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}><Button primary content='Sign Up' /></Menu.Item></Link>
            <Link to={`/login`}><Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick}><Button content='Log In' /></Menu.Item></Link>
          </Menu>
        )}
      </div>
    )
  }
}

export default Navbar
