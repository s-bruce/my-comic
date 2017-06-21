import React, { Component } from 'react'
import { Image, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render() {

    return (
      <div>
        {this.props.loggedIn ? (
          <Menu color='red' inverted borderless size='massive'>
            <Menu.Item>
              <Link to={`/comics/welcome`}><Image src={require('./logo_white.png')} size='small' /></Link>
            </Menu.Item>
            <Menu.Item />
            <Link to={`/comics/my`}><Menu.Item name='comics' className='comic-font' onClick={this.handleItemClick}><br/><br/>My Comics</Menu.Item></Link>
            <Link to={`/comics/new`}><Menu.Item name='new' className='comic-font' onClick={this.handleItemClick}><br/><br/>Create A Comic</Menu.Item></Link>
            <Menu.Menu position='right'>
              <Link to={`/logout`}><Menu.Item name='logout' className='comic-font' onClick={this.handleItemClick}><br/><br/>Log Out</Menu.Item></Link>
            </Menu.Menu>
          </Menu>
        ) : (
          <Menu color='red' inverted borderless size='massive'>
            <Menu.Item>
              <Image src={require('./logo_white.png')} size='small' />
            </Menu.Item>
            <Menu.Item />
            <Link to={`/signup`}><Menu.Item name='signup' className='comic-font' onClick={this.handleItemClick}><br/><br/>Sign Up</Menu.Item></Link>
            <Link to={`/login`}><Menu.Item name='login' className='comic-font' onClick={this.handleItemClick}><br/><br/>Log In</Menu.Item></Link>
          </Menu>
        )}
      </div>
    )
  }
}

export default Navbar
