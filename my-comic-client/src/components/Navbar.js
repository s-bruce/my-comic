import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item header>My Comic</Menu.Item>
        <Link to={`/comics/new`}><Menu.Item name='new' active={activeItem === 'new'} content='Create One-Panel Comic' onClick={this.handleItemClick} /></Link>
        <Link to={`/comics/new/2`}><Menu.Item name='new2' active={activeItem === 'new2'} content='Create Two-Panel Comic' onClick={this.handleItemClick} /></Link>
      </Menu>
    )
  }
}

export default Navbar
