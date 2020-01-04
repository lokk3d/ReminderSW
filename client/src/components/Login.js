import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'universal-cookie';

import axios from "axios"

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    close: {
        padding: theme.spacing(0.5),
      },
}));

export default function SignIn() {
    const classes = useStyles();
    const cookies = new Cookies();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = React.useState(false);

    const handleSubmitButton = () =>{
        axios.post( "/api/login",
        {email:email, password:password})  
            .then( (response) =>{
                console.log("Login eseguito...")
                setError(false)
                console.log(response.data.authToken)
                cookies.set('dateReminder-AuthToken', response.data.authToken, { path: '/' });
                window.location.href =  "/user";
            })
            .catch( (err) => {
                console.log(err)
                console.log("Errore nel login...")
                setError(true)
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(false)
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> Sign in </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
              
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmitButton}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item xs>
                          
                        </Grid>
                        <Grid item>
                            <Link href="/singup" variant="body2">
                                {"Non hai un account? Registrati"}
                            </Link>
                        </Grid>
                    </Grid>
            </div>


            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Wrong email or password...</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />

        </Container>
    );
}