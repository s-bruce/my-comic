import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Divider, Segment, Image } from 'semantic-ui-react'

class Welcome extends React.Component {
  render(){
    console.log("props: ",this.props);
    return(
      <div>
        <div className='sky'>
          <Divider hidden /><Divider hidden /><Divider hidden /><Divider hidden />
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={7}>
                <Divider hidden />
                <Image src={require('./super-hero.png')} size='large' />
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment raised>
                  <h1 className='comic-font'>Greetings {this.props.user.username}!</h1>
                  <h1 className='comic-font'>What adventures await you today?</h1>
                </Segment>
              </Grid.Column>
              {/* <Grid.Column width={2} /> */}
            </Grid.Row>
          </Grid>
          <Divider hidden /><Divider hidden /><Divider hidden /><Divider hidden />
        </div>

        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={6}>
                <Link to={'/comics'}>
                  <Segment raised>
                    <h2 className='comic-font'>I want to see all of my super amazing comics!</h2>
                  </Segment>
                </Link>
              </Grid.Column>
              <Grid.Column width={2} />
              <Grid.Column width={6}>
                <Link to={'/comics/new'}>
                  <Segment raised>
                    <h2 className='comic-font'>I want to make a new super amazing comic!</h2>
                  </Segment>
                </Link>
              </Grid.Column>
              <Grid.Column width={1} />
            </Grid.Row>
          </Grid>
          <Divider hidden />
        </div>
      </div>
    )
  }
}

export default Welcome
