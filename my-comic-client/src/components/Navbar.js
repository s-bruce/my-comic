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
            <Menu.Item name='comics' className='comic-font'><Link to={`/comics`}>{this.props.currentUser.username}'s Comics</Link></Menu.Item>
            <Menu.Item name='new' className='comic-font'><Link to={`/comics/new`}>Create A Comic</Link></Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='logout' className='comic-font'><Link to={`/logout`}>Log Out</Link></Menu.Item>
            </Menu.Menu>
          </Menu>
        ) : (
          <Menu color='red' inverted borderless size='massive'>
            <Menu.Item>
              <Image src={require('./logo_white.png')} size='small' />
            </Menu.Item>
            <Menu.Item />
            <Menu.Item name='signup' className='comic-font'><Link to={`/signup`}>Sign Up</Link></Menu.Item>
            <Menu.Item name='login' className='comic-font'><Link to={`/login`}>Log In</Link></Menu.Item>
          </Menu>
        )}
      </div>
    )
  }
}

export default Navbar
