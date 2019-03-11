import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import FBase from './firebase'
import * as ROUTES from './constants/route'
import { Button, Icon, Grid, Header } from 'semantic-ui-react'
import { AuthContext } from './components/Auth/'

export default class LandingPage extends PureComponent {

  componentDidMount() {
    console.log('landing mount')
  }

  goLogin = () => this.props.history.push(ROUTES.SIGN_IN)

  goSignUp = () => this.props.history.push(ROUTES.SIGN_UP)

  goHomePage = () => this.props.history.push(ROUTES.HOME)

  doSignOut = () => FBase.doSignOut()

  render() {
    console.log('render land')
    return (
      <div>
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div {
              height: 100%;
            }
          `}
        </style>
        <AuthContext.Consumer>          
          {authUser => {
           console.log(authUser)
            return <Grid textAlign="center" verticalAlign="middle" style={{ height: '100%' }}>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='blue' textAlign='center'><Icon name='react' />練習-食譜紀錄</Header>
                {                  
                  authUser
                    ?
                    <React.Fragment>
                      <p>歡迎回來~</p>
                      <Button onClick={this.goHomePage}>進入主頁</Button>
                      <Button color='green' onClick={this.doSignOut}>登出</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <Button color='red' onClick={this.goLogin}>登入</Button>
                      <Button color='red' onClick={this.goSignUp}>註冊</Button>
                    </React.Fragment>
                }
              </Grid.Column>
            </Grid>
          }}
        </AuthContext.Consumer>
      </div>
    )
  }
}

