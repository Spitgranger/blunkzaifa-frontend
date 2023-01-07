import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function Auth() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false); 

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const switchMode = () => {
        setIsSignup((prevState) => !prevState);
    }

  return (
    <Container component='main' maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )
                    }
                    <Input name='email' label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Password Again" handleChange={handleChange}/>}
                </Grid>
                <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already Have Account' : "Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Paper>

    </Container>
  )
}

export default Auth