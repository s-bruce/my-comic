import React, { Component } from 'react'
import { Image, Menu } from 'semantic-ui-react'
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
            <Menu.Item name='comics' className='comic-font' onClick={this.handleItemClick}><Link to={`/comics`}>{this.props.currentUser.username}'s Comics</Link></Menu.Item>
            <Menu.Item name='new' className='comic-font' onClick={this.handleItemClick}><Link to={`/comics/new`}>Create A Comic</Link></Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='logout' className='comic-font' onClick={this.handleItemClick}><Link to={`/logout`}>Log Out</Link></Menu.Item>
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
