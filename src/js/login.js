import React, { PureComponent } from 'react'
import FBase from './firebase'
import * as ROUTES from './constants/route'
import { Button, Form, Segment, Grid } from 'semantic-ui-react'

const INIT_STATE = {
    email: '',
    password: '',
    error: null
}

export default class Login extends PureComponent {
    state = INIT_STATE

    componentDidMount() {
        const user = FBase.getCurrentUser()
        if (user)
            this.props.history.push(ROUTES.HOME)
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        console.log('submit')
        event.preventDefault()
        const { email, password } = this.state

        FBase.doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INIT_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        let { email, password, error } = this.state
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
                <Grid textAlign="center" verticalAlign="middle" style={{ height: '100%' }}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size='large' onSubmit={this.onSubmit}>
                            <Segment>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    placeholder='E-mail address'
                                />
                                <Form.Input
                                    fluid
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    placeholder='Password'
                                />
                                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                                <Button
                                    fluid
                                    size='large'
                                    color='teal'
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
